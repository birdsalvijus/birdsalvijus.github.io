document.addEventListener("DOMContentLoaded", function () {
    // Fade in the body
    document.body.style.opacity = '1';

    const canvas = document.getElementById('mouseCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let prevX = null;
    let prevY = null;

    // Set random background image on page load
    const totalImages = 53;
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    const bgImageUrl = `img/bg/${randomIndex}.jpg`;
    document.getElementById('bg').style.backgroundImage = `url('${bgImageUrl}')`;

    function getPos(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.clientX || (event.touches[0] && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches[0] && event.touches[0].clientY);
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function drawLine(pos) {
        if (prevX !== null && prevY !== null) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function onMove(event) {
        event.preventDefault();
        const pos = getPos(event);
        if (pos) {
            drawLine(pos);
            prevX = pos.x;
            prevY = pos.y;
        } else {
            prevX = null;
            prevY = null;
        }
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        onMove(event);
    });
    document.addEventListener('touchend', function () {
        prevX = null;
        prevY = null;
    });

    window.addEventListener('resize', function () {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.putImageData(imageData, 0, 0);

        document.querySelectorAll('.popupWindow.show').forEach(function (popup) {
            adjustPopupPosition(popup);
        });
    });

    const popupLinks = document.querySelectorAll('.popupLink');
    const closeButtons = document.querySelectorAll('.closePopup');

    function setPopupZIndex(popup) {
        document.querySelectorAll('.popupWindow').forEach(p => {
            p.style.zIndex = 99;
        });
        popup.style.zIndex = 100;
    }

    popupLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetIds = link.getAttribute('data-target').split(',').map(id => id.trim());

        const baseLeft = Math.floor(Math.random() * (window.innerWidth - 200));
        const baseTop = Math.floor(Math.random() * (window.innerHeight - 200));
        const offsetX = window.innerWidth * 0.10;
        const offsetY = window.innerHeight * 0.10;

        targetIds.forEach((targetId, index) => {
            const popup = document.getElementById(targetId);
            if (!popup) return;

            popup.classList.add('show');
            updatePopupImage(popup, 0);

            let randomLeft = Math.floor(Math.random() * (window.innerWidth - popup.offsetWidth - 20));
            let randomTop = Math.floor(Math.random() * (window.innerHeight - popup.offsetHeight - 20));

            popup.style.left = `${randomLeft}px`;
            popup.style.top = `${randomTop}px`;
            popup.style.transform = 'translate(0, 0)';
            popup.style.zIndex = 100 + (targetIds.length - index); // First = top

            adjustPopupPosition(popup);
        });
    });
});


    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const popup = button.closest('.popupWindow');
            if (popup) popup.classList.remove('show');
        });
    });

    function updatePopupImage(popup, index) {
        const imageElement = popup.querySelector('.popupImage');
        const images = popup.querySelectorAll('.imageList img');
        if (images.length > 0) {
            imageElement.src = images[index].src;
            imageElement.setAttribute('data-index', index);
        }
    }

    document.querySelectorAll('.carouselButton').forEach(button => {
        button.addEventListener('click', function () {
            const popup = this.closest('.popupWindow');
            const imageElement = popup.querySelector('.popupImage');
            const images = popup.querySelectorAll('.imageList img');
            let currentIndex = parseInt(imageElement.getAttribute('data-index'));

            if (this.classList.contains('next')) {
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            updatePopupImage(popup, currentIndex);
        });
    });

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.addEventListener('click', function (event) {
        event.preventDefault();
        const imageData = canvas.toDataURL('image/png');
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = imageData;
        downloadAnchor.download = 'my_drawing.png';
        downloadAnchor.click();
    });

    function adjustPopupPosition(popup) {
        const popupRect = popup.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newLeft = popup.offsetLeft;
        let newTop = popup.offsetTop;

        if (popupRect.right > viewportWidth) {
            newLeft = viewportWidth - popupRect.width - 10;
            if (newLeft < 0) newLeft = 0;
        }

        if (popupRect.bottom > viewportHeight) {
            newTop = viewportHeight - popupRect.height - 10;
            if (newTop < 0) newTop = 0;
        }

        if (popupRect.left < 0) {
            newLeft = 10;
        }

        if (popupRect.top < 0) {
            newTop = 10;
        }

        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    }

    function makePopupDraggable(popup) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        popup.addEventListener('mousedown', function (e) {
            if (e.target.closest('.closePopup')) return;

            isDragging = true;
            offsetX = e.clientX - popup.offsetLeft;
            offsetY = e.clientY - popup.offsetTop;
            popup.style.cursor = 'move';

            setPopupZIndex(popup);
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft + popup.offsetWidth > viewportWidth) {
                    newLeft = viewportWidth - popup.offsetWidth;
                }
                if (newTop + popup.offsetHeight > viewportHeight) {
                    newTop = viewportHeight - popup.offsetHeight;
                }

                popup.style.left = `${newLeft}px`;
                popup.style.top = `${newTop}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                popup.style.cursor = 'default';
            }
        });
    }

    document.querySelectorAll('.popupWindow').forEach(popup => {
        makePopupDraggable(popup);
    });
});
