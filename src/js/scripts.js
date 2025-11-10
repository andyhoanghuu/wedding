window.addEventListener('DOMContentLoaded', function () {
    const preloaderHeart = document.querySelector('.preloader-heart');
    const preloaderBack = document.querySelector('.preloader-back');
    if (preloaderHeart) {
        preloaderHeart.style.display = 'none';
    }
    if (preloaderBack) {
        preloaderBack.style.display = 'none';
    }
});

// Sal.js initialization
window.addEventListener('load', function () {
    sal({
        threshold: 0.5,
        once: true,
        selector: '[data-sal]',
        animateClassName: 'sal-animate',
        disabledClassName: 'sal-disabled',
        rootMargin: '0% 50%'
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const audioElement = document.querySelector('audio');
    const audioToggle = document.querySelector('.audio-toggle');
    const iconCancel = document.querySelector('.icon-cancel');
    let hasUserInteracted = false;
    let isPlaying = false;

    // Function để phát nhạc
    function playMusic() {
        if (audioElement && !isPlaying) {
            audioElement.play().then(() => {
                isPlaying = true;
                iconCancel.style.display = 'none'; // Ẩn icon cancel khi phát nhạc
            }).catch(error => {
                console.log('Không thể phát nhạc:', error);
            });
        }
    }

    // Function để dừng nhạc
    function pauseMusic() {
        if (audioElement && isPlaying) {
            audioElement.pause();
            isPlaying = false;
            iconCancel.style.display = 'block'; // Hiển thị lại icon cancel
        }
    }

    // Function kiểm tra xem element có phải là con của audio-toggle không
    function isInsideAudioToggle(element) {
        if (!element) return false;

        // Kiểm tra chính element đó
        if (element.classList && element.classList.contains('audio-toggle')) {
            return true;
        }

        // Kiểm tra các parent element
        let parent = element.parentElement;
        while (parent) {
            if (parent.classList && parent.classList.contains('audio-toggle')) {
                return true;
            }
            parent = parent.parentElement;
        }

        return false;
    }

    // Xử lý click vào nút toggle
    audioToggle.addEventListener('click', function (e) {
        e.stopPropagation(); // Ngăn event bubbling

        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
            hasUserInteracted = true;
        }
    });

    // Lắng nghe các sự kiện tương tác của người dùng trên toàn trang
    const userInteractionEvents = [
        'click', 'keydown', 'scroll',
        'touchstart', 'touchmove', 'mouseenter'
    ];

    function handleUserInteraction(e) {
        // Kiểm tra xem có phải click vào audio toggle không
        if (e.target && isInsideAudioToggle(e.target)) {
            return;
        }

        if (!hasUserInteracted && !isPlaying) {
            playMusic();
            hasUserInteracted = true;
        }
    }

    // Thêm event listener cho tất cả các loại tương tác
    userInteractionEvents.forEach(eventType => {
        document.addEventListener(eventType, handleUserInteraction, {once: false});
    });

    // Xử lý khi audio kết thúc (nếu không loop)
    audioElement.addEventListener('ended', function () {
        isPlaying = false;
        iconCancel.style.display = 'block';
    });
});

// Lấy các element
const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.getElementById("closePopup");
const overlay = document.getElementById("popupOverlay");

// Mở popup
function openPopup() {
    popup.classList.add("show");
    document.body.style.overflow = "hidden"; // Ngăn cuộn trang khi popup mở
}

// Đóng popup
function closePopup() {
    popup.classList.remove("show");
    document.body.style.overflow = "auto"; // Cho phép cuộn trang lại
}

// Event listeners
openBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

// Đóng popup khi click vào overlay
overlay.addEventListener("click", closePopup);

// Đóng popup khi nhấn ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup.classList.contains("show")) {
        closePopup();
    }
});
