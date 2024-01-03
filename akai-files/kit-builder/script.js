$(document).ready(function () {
    let dropper = $('.dropper');
    $('#toolbar').hide();
    var $errors = 0;
    var $messages = [];
    var ready = true;
    var $currentFile = '';
    var queue = [];
    var grid = [];
    var $fr = new FileReader();

    $fr.addEventListener('loadend', processFile);
    dropper.on('dragenter dragover dragleave drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    dropper.on('dragover dragenter', function (e) {
        dropper.addClass('hilite');

    });
    dropper.on('dragleave drop', function (e) {
        dropper.removeClass('hilite');
    });
    dropper.on('drop', function (e) {
        $errors = 0;
        $messages = [];
        let dt = e.originalEvent.dataTransfer;

        let files = dt.files;
        if (files.length > 128) {
            alert('At Max Only 128 Files Can Be loaded in a Kit');
            return;
        }
        processFiles(files);
    });

    $('#SAVE').on('click', SAVEKIT);
    $('#NEW').on('click', INIT);
    function INIT() {
        queue = [];
        grid = [];
        $('#KITNAME').val('');
        $('#toolbar').hide();

        buildGrid();
    }
    function processFiles($files) {
        //     if ($files.length > 1) INIT();
        for (i = 0; i < $files.length; i++) {
            $f = $files[i];

            if (validName($f.name)) {
                // console.log(getChunks($f.name));
                queue.push($f);
            } else {
                $errors += 1;
                $messages.push('"' + $f.name + '" has invalid Name');
            }

        }
        if ($errors) {
            showErrors();
        } else {
            showErrors(false)
            processQ();

        }
    }
    function processQ($f) {
        let message = "DROP Wav Files Here";
        if (queue.length > 0) {
            $('#print').hide();
            $('#dropper').text('PLEASE WAIT ...');
            $f = queue.shift();
            $currentFile = $f.name;
            $fr.readAsBinaryString($f);
        } else {
            showErrors();
            console.log('queue processed');
            $('#dropper').text(message);
            if ($errors == 0) {
                buildGrid();
            }
            $('#print').show();

        }
    }
    function processFile() {
        $fb = $fr.result;
        $header = $fb.substr(0, 12);

        $skip = false;
        if ($header.substr(0, 4) != "RIFF" && $header.substr(8, 4) != "WAVE") {
            $errors += 1;
            $skip = true;
            $messages.push('Invalid Wave File: ' + $currentFile)
        }
        if (!$skip) {
            $fmtpos = $fb.indexOf('fmt', 12);
            $fmtsize = byteSum($fb.substr($fmtpos + 4, 4));

            //if ($fmtsize == 16) {
            $format = byteSum($fb.substr($fmtpos + 8, 2));
            $channels = byteSum($fb.substr($fmtpos + 10, 2));
            $samplerate = byteSum($fb.substr($fmtpos + 12, 4));
            $depth = byteSum($fb.substr($fmtpos + 22, 2));
            $datapos = $fb.indexOf('data', 32);

            $datasize = byteSum($fb.substr($datapos + 4, 4));
            $sampleend = $datasize / ($channels * ($depth / 8));
            $o = {
                file: $currentFile,
                name: getChunks($currentFile)[1],
                samples: $sampleend,
                depth: $depth,
                channels: $channels,
                samplerate: $samplerate
            };
            grid.push($o);

            /* }
             else {
                 $errors += 1;
                 $skip = true;
                 $messages.push('Wave File not PCM: ' + $currentFile)
     
             }*/

        }

        processQ();
    }
    function byteSum(bytes) {
        $bytes = unpack(bytes);
        $sum = 0;
        for (let i = 0; i < $bytes.length; i++) {
            $sum += ($bytes[i] << (8 * i));
        }
        return $sum;
    }


    function unpack(str) {
        return str.split('').map(b => b.charCodeAt(0));


    }

    function showErrors(hide = false) {
        $('#errors').empty();
        $('#toolbar').hide();
        if ($errors) {
            let $o = "<ol>";
            $messages.forEach($m => {
                $o += '<li>' + $m + '</li>';
            });
            $o += '</ol>';
            $('#errors').html($o);
        }

        if ($errors) $('#errors').show();
        else $('#errors').hide();

    }
    function validName($n) {
        $r = RegExp('.[w|W][a|A][v|V]$');
        return $r.test($n);
    }
    function getChunks($n) {
        $r = RegExp('^(.+)(\.[w|W][a|A][v|V])$');
        return $r.exec($n);
    }

    function buildGrid() {
        $('#UI').empty();
        $grid = '<ul id="grid">';
        for (let i = 0; i < grid.length; i++) {
            $grid += '<li  data-index="' + i + '" class="cell" title="' + grid[i].file + '">';
            $grid += i + 1 + ": " + grid[i].file;
            $grid += '</li> ';
        }
        $grid += '</ul> ';
        $('#UI').html($grid);
        $('#UI').show();
        $('#grid').sortable();
        $('#grid').disableSelection();
        if (grid.length) $('#toolbar').show(500);
        $('#grid').on('sortupdate', e => {
            let newgrid = [];
            $('#grid li').each(function (e) {
                let index = $(this).data('index');
                console.log()
                newgrid.push(grid[index]);
            });
            grid = Array.from(newgrid);
            buildGrid();
        });

    }
    function trunc($s, l) {
        return $s.length <= (l + 3) ? $s : $s.slice(0, l) + '...';
    }
    function SAVEKIT() {
        let $name = $('#KITNAME').val().trim();
        if ($name.trim() == '') {
            alert('Please provide Kit Name');
            return;
        }
        $fname = $name + ".xpm";
        let $I = '';
        for (let i = 1; i <= 128; i++) {
            $I += getInstrument(i) + "\n";
        }
        $T = $templates.kit.replace('##NAME##', $name);
        $T = $T.replace('##INSTRUMENTS##', $I);

        var file;
        var properties = { type: 'application/.xpm' };
        file = new Blob([$T], properties);
        saveBLOB(file, $fname);


    }

    function getInstrument($index) {
        $item = $templates.pad.replace('##NUM##', $index);
        let $END = 0;
        let $SAMPLE = '';
        if ($index <= grid.length) {
            $END = grid[$index - 1].samples - 1;
            $SAMPLE = grid[$index - 1].name;
        }
        $item = $item.replace('##NAME##', $SAMPLE);
        $item = $item.replace('##END##', $END);
        return $item;
    }



    function saveBLOB(blob, fileName) {
        var url = window.URL.createObjectURL(blob);

        var anchorElem = document.createElement("a");
        anchorElem.style = "display: none";
        anchorElem.href = url;
        anchorElem.download = fileName;

        document.body.appendChild(anchorElem);
        anchorElem.click();

        document.body.removeChild(anchorElem);

        // On Edge, revokeObjectURL should be called only after
        // a.click() has completed, atleast on EdgeHTML 15.15048
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
        }, 1000);
    }

}); //end jquery ready

