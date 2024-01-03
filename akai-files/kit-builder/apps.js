if (window.jQuery) {
  var $ = jQuery;
  $(document).ready(function () {
    $apps = [
      ["Website", "https://www.amitszone.com",
        "Visit My Website | www.amitszone.com",
        "https://midi.amitszone.com/images/website.jpg"
      ],
      [
        " Riff Maker",
        "https://midi.amitszone.com/RIFFMAKER/",
        `Online Midi Pattern Generator and Programmer
          |Random Riff Generation
          |Song Mode
          |Ratchets/Velocity/Accent/Slide Per Step
          |2-16 16th note Patterns
          |Midi and MPC Pattern Export
          |Midi Clock Sync and CC Control
          |Akai Force Midi Control Template`,
        "https://midi.amitszone.com/images/riffmaker.jpg"
      ],
      [
        "RagaApp",
        "https://midi.amitszone.com/TheRagaApp",
        `A Visual Aid for Many Indian/Hindustani Classical Ragas.
          |Interactive Keyboard and Guitar Digrams.
          |Chord Suggestion,
          |Visualize in Any Key
          |Alt Guitar Tunings + Custom Tuning Visualization`,
        "https://midi.amitszone.com/images/ragaapp.jpg"
      ],

      ["Midi Wizer", "https://midi.amitszone.com/wizer",
        `16 Channel Midi Utility / Processor
          |Midi Routing To Other Channels
          |Midi Filters 
          |Midi Spliiter to channels
          |Transpose, CC Remap, Ranges,Note Remap
          |Note to Chords,
          |Aftertouch => CC
          |PitchBend Multiplier`,
        "https://midi.amitszone.com/images/wizer.jpg"
      ],
      [
        "GR55",
        "https://midi.amitszone.com/GR55",
        `GR55 Patch Librarian - Search, and Load Huge Repository of Roland GR 55 Patches.
        |Username: GR55
        |Password: library
        `,
        "https://midi.amitszone.com/images/gr55.jpg"
      ],
      [
        "JUPITER",
        "https://midi.amitszone.com/JUPITER",
        `Utility and Basic Editor for Roland Jupiter X(m)1
        |Does not Support/Edit Patch (MFX)
        |Jupiter Engine Editor,
        |Juno 106 Engine Editor
        |JX-8P Engine Editor
        |SH101 Engine Editor
        |Save Load Patches from File System
        `,
        "https://midi.amitszone.com/images/jupiter.jpg"
      ],
      [
        "JX Randomizer",
        "https://midi.amitszone.com/JXRANDOM",
        `Load Random Patches into Layers of your Jupiter X/Sm Scene`,
        "https://midi.amitszone.com/images/basic.png"
      ],
      [
        "DX7P",
        "https://midi.amitszone.com/DX7",
        `DX7 Patch Library for Yamaha DX7 - Huge Database of around 40000 Searchable Patches
        |Supports Korga Volca FM
        |Supports NI FM8
        |Supports Dexed VST`,
        "https://midi.amitszone.com/images/dx7.jpg"
      ],
      [
        "Rise Kronos",
        "https://midi.amitszone.com/risekronos",
        `Use Korg Kronos Combis as MPE with ROLI Seaboard
        |Use any program on Kronos as MPE with a Roli Seaboard
        |All edits are synced - Copies progream on Ch1: To all other channels
        `,
        "https://midi.amitszone.com/images/risekronos.jpg"
      ],

      [
        " TD-3 Patcher",
        "https://midi.amitszone.com/TD3BUILDER/",
        `Patch Maker and Saver for Behringer TD-3 Bassline Synth
        |Random Patch Generation will a lot of control
        |Sequence Patters as Song
        |Midi CC control of App Parameters
        |Midi and MpcPattern Export


        `,
        "https://midi.amitszone.com/images/td3patcher.jpg"
      ],

      [
        "Chord Humanizer",
        "https://midi.amitszone.com/FORCE/HUMANIZER/",
        "Realtime Humanizer for Chords - Great for Force/MPC|Inter-Note Delay and Strum",
        "https://midi.amitszone.com/images/humanizer.jpg"
      ],

      [
        "Prog Builder",
        "https://midi.amitszone.com/FORCE/PBUILDER/",
        "AKAI Force/MPC Chord Progressions Builder",
        "https://midi.amitszone.com/images/progbuilder.jpg"
      ],

      [
        "Prog Reporter",
        "https://midi.amitszone.com/FORCE/REPORTER/",
        "Generate Report of Chord <=> Pdd Map|Use Browser to Print to PDF",
        "https://midi.amitszone.com/images/progreporter.jpg"
      ],
      [
        "Force/MPC Kit Builder",
        "https://midi.amitszone.com/FORCE/KITBUILDER/",
        "AKAI Force/MPC Drumkit Builder",
        "https://midi.amitszone.com/images/kitbuilder.jpg"
      ],
      [
        "Force/MPC Kit Mangler",
        "https://midi.amitszone.com/FORCE/KITMANGLER/",
        "Mix Kit layers for Akai Force/MPC Kits",
        "https://midi.amitszone.com/images/kitmangler.jpg"
      ],
      [
        "Force/MPC Kit Mapper",
        "https://midi.amitszone.com/FORCE/KITMAPPER/",
        "View/Print Midi Note and Sample Mappinga Akai Force/Mpc Kits",
        "https://midi.amitszone.com/images/kitmapper.jpg"
      ],
      [
        "Force Midi Program Builder",
        "https://midi.amitszone.com/FORCE/FORCEMIDIMAPPER",
        "Build Midi Mappings Templates for your Midi/External Synths",
        "https://midi.amitszone.com/images/basic.png"
      ],
      [
        "LPP Light Show Builder",
        "https://midi.amitszone.com/LPP_LIGHTSHOW_BUILDER",
        "Build Animated Light Shows (midi clips) for Novation Launch Pad Pro",
        "https://midi.amitszone.com/images/basic.png"
      ],
      [
        "MIDI Logger",
        "https://midi.amitszone.com/MIDILOGGER",
        "View Incoming Midi Messages on a POrt for Debugging",
        "https://midi.amitszone.com/images/basic.png"
      ],
      [
        "Pitch Finder",
        "https://midi.amitszone.com/PITCHFINDER",
        `A Basic Calulator to find the Pitch of Sample selection between end and start points
        |Useful for Single Cycle Waveforms`,
        "https://midi.amitszone.com/images/basic.png"
      ],

    ];


    $list = '<div id="appcontainer"><div id="myapps"><span id="apptitle">Other Apps</span><ul id ="applist"> ';
    $apps.forEach((e) => {
      $list +=
        '<li class="card" style="background-image:url(' + e[3] + ');"><a target="_blank" href="' +
        e[1] +
        '"><div class="cardtitle">' +
        e[0] +
        '</div><div class="carddesc">' +
        strToList(e[2], '|') +
        "</div></a></li>";
    });
    $list += "</ul></div></div>";

    $style = "<style>";
    $style +=
      "#applist {margin:0;\npadding:0;\nlist-type:none;display:none;}\n";
    $style +=
      "#applist>li {margin:0;padding:4px;list-style:none;font-size:14px; border:1px solid #ccc;}";
    $style +=
      "#myapps {font-family:sans-serif;font-size:14px;position:absolute; padding:4px; border:1px solid #ccc; bottom:16px;right:16px;background-color:#fff;}";
    $style += "#myapps:hover ul {display:block;}";
    $style +=
      "#applist>li span {display:block;font-size:12px;font-weight:normal;}";
    $style += "#applist li a {display:block;color:#000; text-decoration:none;}";
    $style +=
      "#applist li:hover {color:#fff; background-color:#333; text-decoration:none;}";
    $style += "#applist li:hover a{color:#fff;}";
    $style +=
      "#myapps>span {border:1px solid #000;padding:8px;display:block;text-transform:uppercase;font-weight:bold;}";
    $style +=
      "#myapps:hover >span {display:block;color:#fff;background-color:#000;text-transform:uppercase;font-weight:bold;}";
    $style += `
    li.card.card.card {
      background-image:none !important!
      background:none !important!
      background-size: 0 0 !important;
    }
    #applist li ul {
      list-style:none;
      margin:0;
      padding:0;
      font-size:0.7em;
    }
    .carddesc {
      display:none;
      transition:opacity 0.2s;
      opacity:0;
      pointer-options:none;
       overflow:hidden;
      background-color:#fff;
      position:absolute;

    }
    #applist>li:hover .carddesc {
      opacity:1;
    }
    .carddesc li {
      font-size:0.6rem;
    }
    #myapps {
      display:flex;
      flex-direction:column;
        }
        #myapps #applist {
          flex:1;
           overflow-y:scroll;
           max-height:100vh;
        }
        #myapps {
          z-index:9999999;
        }
    `;
    $style += "</style >";


    $("body").append($list);
    if (!document.noSTYLE) {
      $('.card').css('backgroundImage', '');
      $("body").append($style);
    }
    /*$("body").append($style);*/
    function strToList(str, delim = "|") {
      let list = str.split(delim).map(v => `<li> ${v.trim()}</li> `).join(' ');
      return `<ul> ${list}</ul > `;
    }
  });

}
