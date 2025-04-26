
document.addEventListener('DOMContentLoaded', function () {
  // Lấy tất cả các carousel
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0; // Mặc định là slide đầu tiên

    // Lấy nút mũi tên cho từng carousel
    const nextButton = carousel.querySelector('.carousel-control-next');
    const prevButton = carousel.querySelector('.carousel-control-prev');

    // Hàm chuyển sang slide tiếp theo
    function showNextSlide() {
      // Mờ slide hiện tại
      slides[currentIndex].style.transition = 'opacity 0.5s ease'; // Thêm hiệu ứng mờ
      slides[currentIndex].style.opacity = 0; // Mờ slide hiện tại

      setTimeout(() => {
        // Ẩn slide hiện tại và chuyển đến slide tiếp theo
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length; // Quay vòng các slide
        slides[currentIndex].classList.add('active');
        
        // Thiết lập lại opacity cho tất cả các slide
        slides.forEach(slide => {
          slide.style.opacity = 0; // Đảm bảo tất cả slide đều mờ
        });

        // Làm sáng slide mới từ mờ với thời gian rõ dần 2s
        slides[currentIndex].style.transition = 'opacity 2s ease'; // Thêm hiệu ứng rõ dần cho slide mới
        setTimeout(() => {
          slides[currentIndex].style.opacity = 1; // Làm sáng slide mới từ mờ
        }, 50); // Đảm bảo hiệu ứng mờ xong trước khi bắt đầu rõ dần

        // Cập nhật nút prev và next
        prevButton.classList.add('show'); // Hiển thị nút prev khi đến slide cuối

        // Ẩn nút next khi ở slide cuối cùng
        if (currentIndex === slides.length - 1) {
          nextButton.classList.remove('show'); // Ẩn nút next
        }
      }, 500); // Sau 500ms mới chuyển sang slide tiếp theo
    }

    // Hàm quay lại slide trước
    function showPrevSlide() {
      // Mờ slide hiện tại
      slides[currentIndex].style.transition = 'opacity 0.5s ease'; // Thêm hiệu ứng mờ
      slides[currentIndex].style.opacity = 0; // Mờ slide hiện tại

      setTimeout(() => {
        // Ẩn slide hiện tại và quay lại slide trước
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Quay vòng các slide
        slides[currentIndex].classList.add('active');
        
        // Thiết lập lại opacity cho tất cả các slide
        slides.forEach(slide => {
          slide.style.opacity = 0; // Đảm bảo tất cả slide đều mờ
        });

        // Làm sáng slide mới từ mờ với thời gian rõ dần 2s
        slides[currentIndex].style.transition = 'opacity 2s ease'; // Thêm hiệu ứng rõ dần cho slide mới
        setTimeout(() => {
          slides[currentIndex].style.opacity = 1; // Làm sáng slide mới từ mờ
        }, 50); // Đảm bảo hiệu ứng mờ xong trước khi bắt đầu rõ dần

        // Cập nhật nút prev và next
        if (currentIndex === 0) {
          prevButton.classList.remove('show'); // Ẩn nút prev khi ở slide đầu tiên
        }

        // Hiển thị lại nút next khi không còn ở cuối
        nextButton.classList.add('show'); // Hiển thị nút next
      }, 500); // Sau 500ms mới quay lại slide trước
    }

    // Lắng nghe sự kiện nhấn nút mũi tên tiếp theo
    nextButton.addEventListener('click', showNextSlide);

    // Lắng nghe sự kiện nhấn nút mũi tên quay lại
    prevButton.addEventListener('click', showPrevSlide);

    // Hiển thị slide đầu tiên và chỉ hiển thị nút next ban đầu
    slides[currentIndex].classList.add('active');
    slides[currentIndex].style.opacity = 1; // Làm sáng slide đầu tiên
    prevButton.classList.remove('show'); // Ẩn nút prev khi bắt đầu
    nextButton.classList.add('show'); // Đảm bảo nút next hiển thị khi bắt đầu
  });
});



// Nút xem thêm
document.querySelectorAll(".view-more").forEach(button => {
  button.addEventListener("click", function () {
      let popupId = this.getAttribute("data-target");
      let overlay = document.getElementById("overlay" + popupId.slice(-1));
      let popup = document.getElementById(popupId);

      overlay.classList.add("active");

      // Hiển thị popup với hiệu ứng xuất hiện từ từ
      popup.style.visibility = "visible";
      setTimeout(() => {
          popup.classList.add("active");
      }, 50);

      // 🔥 Fix lỗi dịch chuyển bằng cách giữ lại padding-right khi mở popup
      let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = scrollBarWidth + "px";

      // Khóa cuộn nền nhưng vẫn cho phép cuộn trong popup
      document.body.classList.add("no-scroll");
  });
});

// Hàm đóng popup
function closePopup(popupId) {
  let overlay = document.getElementById("overlay" + popupId.slice(-1));
  let popup = document.getElementById(popupId);

  popup.classList.add("fade-out");

  setTimeout(() => {
      overlay.classList.remove("active");
      popup.classList.remove("active", "fade-out");
      popup.style.visibility = "hidden"; // Ẩn popup sau khi hiệu ứng kết thúc

      // 🚀 Khôi phục lại cuộn nền và xóa padding-right
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";
  }, 300);
}

// Đóng popup khi bấm nút đóng
document.querySelectorAll(".close-btn").forEach(button => {
  button.addEventListener("click", function () {
      closePopup(this.getAttribute("data-target"));
  });
});

// Đóng popup khi bấm ra ngoài overlay
document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", function () {
      closePopup(this.id.replace("overlay", "popup"));
  });
});

// Đóng popup khi nhấn phím Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
      document.querySelectorAll(".popup.active").forEach(popup => {
          closePopup(popup.id);
      });
  }
});

// 🔒 Ngăn cuộn nền nhưng vẫn cho phép cuộn trong popup
document.addEventListener("wheel", function (event) {
  let popup = document.querySelector(".popup.active");
  if (popup) {
      let isScrollable = popup.scrollHeight > popup.clientHeight;
      let isInsidePopup = popup.contains(event.target);

      // Nếu cuộn bên trong popup và popup có thể cuộn thì không ngăn chặn
      if (isInsidePopup && isScrollable) return;

      // Nếu không, ngăn cuộn trang
      event.preventDefault();
  }
}, { passive: false });

//TOP 10
// Lấy tất cả các slide
const slides = document.querySelectorAll('.slide-top10');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0; // Bắt đầu từ slide đầu tiên
prevBtn.style.display = 'none'; // Ẩn nút trái ban đầu

// Hàm cập nhật trạng thái hiển thị của các slide với hiệu ứng mờ dần
function showSlide(index) {
    if (index === currentSlide) return; // Không làm gì nếu không thay đổi slide

    // Ẩn slide hiện tại với hiệu ứng mờ dần
    slides[currentSlide].classList.add('fade-out');
    slides[currentSlide].classList.remove('fade-in');

    setTimeout(() => {
        slides[currentSlide].style.display = 'none'; // Ẩn hoàn toàn slide cũ
        slides[index].style.display = 'flex'; // Hiển thị slide mới

        // Thêm hiệu ứng hiện dần
        slides[index].classList.remove('fade-out');
        slides[index].classList.add('fade-in');

        currentSlide = index; // Cập nhật trạng thái slide hiện tại
        updateButtonsVisibility(); // Cập nhật hiển thị nút
    }, 500); // Phù hợp với thời gian hiệu ứng CSS
}

// Hàm cập nhật trạng thái của các nút "prev" và "next"
function updateButtonsVisibility() {
    if (currentSlide > 0) {
        prevBtn.style.display = 'block'; // Chỉ hiển thị nút trái khi đã bấm phải
    } else {
        prevBtn.style.display = 'none';
    }
    
    nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
}

// Sự kiện khi nhấn nút "Next"
nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
});

// Sự kiện khi nhấn nút "Prev"
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
});

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);


//Tạo BÓNG BÔNG
function createBubble() {
  let bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  // Vị trí ngẫu nhiên cho bong bóng
  bubble.style.left = Math.random() * 100 + '%';  // Đặt vị trí ngang
  bubble.style.bottom = '0';  // Đặt vị trí dọc
  
  // Thêm bong bóng vào tiêu đề
  document.querySelector('.title-h1').appendChild(bubble);
  
  // Xóa bong bóng sau khi hoàn thành hiệu ứng
  setTimeout(() => bubble.remove(), 5000);
}

// Tạo bong bóng mỗi 500ms
setInterval(createBubble, 500);

let thumbnails = document.querySelectorAll('.thumbnail');
let banner = document.getElementById("banner");
let movieTitle = document.getElementById("movie-title");
let movieDescription = document.getElementById("movie-description");
let movieYear = document.getElementById("movie-year");
let movieIMDB = document.getElementById("movie-imdb");
let movieAge = document.getElementById("movie-age");
let moviePart = document.getElementById("movie-part");
let movieEpisode = document.getElementById("movie-episode");
let movieGenres = document.querySelector(".sub-tags");

// Lấy các nút điều khiển
let playBtn = document.getElementById("play-btn");
let favoriteBtn = document.getElementById("favorite-btn");
let infoBtn = document.getElementById("info-btn");


let movies = [
    { 
        image: "trangchu1.webp", title: "BÓNG MA ANH QUỐC", 
        description: "Được đặt trong bối cảnh nước Anh đầu thế kỷ 19, Peaky Blinders nói về gia đình Shelby, những người cầm đầu băng đảng Peaky Blinders khét tiếng trong thế giới ngầm với bộ não là Tommy Shelby, đứa con trai thứ hai. Bộ phim là hành trình thăng tiến trong...",
        year: "2013", imdb: "IMDb 8.7", age: "T18", part: "Phần 6", episode: "Tập 6",
        genres: ["Chính Kịch", "Hành Động", "Gây Cấn", "Hình Sự", "Cổ Điển" , "Phiêu Lưu"],
    },
    { 
        image: "trangchu2.webp", title: "Daredevil: Tái Xuất", 
        description: "Matt Murdock, một luật sư mù với khả năng đặc biệt, chiến đấu cho công lý thông qua công ty luật sầm uất của mình. Trong khi cựu trùm mafia Wilson Fisk theo đuổi những nỗ lực chính trị của riêng mình ở New York. Khi quá khứ của họ bắt đầu lộ diện, cả...",
        year: "2025", imdb: "IMDb 8.6", age: "T18", part: "Phần 1", episode: "Tập 7",
        genres: ["Chính Kịch", "Hình Sự", "Siêu Anh Hùng", "Marvel"]
    },
    { 
        image: "trangchu3.webp", title: "Rô-bốt Đại Chiến Cuối Cùng", 
        description: "Tiếp nối hành trình phần 4 - Cade Yeager, cùng với con gái và bạn trai của cô con gái (một tay đua đường phố) đồng hành cùng các Autobots (Autobots Bumblebee, Hound, Drift, và Crosshairs) để bảo vệ Trái Đất. Trong khi Optimus tạm mất tích, để tìm k...",
        year: "2017", imdb: "IMDb 5.3", age: "T13",part: "Phần 1", episode: "2h 34m",
        genres: ["Hành Động", "Chiếu Rạp", "Khoa Học", "Kỳ Ảo", "Viễn Tưởng", "Phiêu Lưu"]
    },
    { 
        image: "trangchu4.webp", title: "Anh Không Đau", 
        description: "Một người đàn ông không thể cảm nhận nỗi đau thể xác đã biến căn bệnh hiếm gặp của mình thành lợi thế bất ngờ trong cuộc chiến sinh tử để giải cứu cô gái trong mơ.",
        year: "2025", imdb: "IMDb 6.7", age: "T16", part: "Phần 1", episode: "1h 50m",
        genres: ["Hành Động", "Chiếu Rạp", "Gây Cấn", "Kinh Dị", "Hài", "Phiêu Lưu"]
    },
    { 
        image: "trangchu5.webp", title: "Tuyệt Đỉnh Kung Fu", 
        description: "Trong xã hội hỗn loạn ở Trung Quốc những năm 1940, các băng nhóm thực sự có ảnh hưởng. Trong phim, đáng sợ nhất phải kể đến đảng Lưỡi Búa mà kẻ đứng đầu là Sum. Băng nhóm của Sum đi đến đâu nỗi kinh hoàng theo tới đó. Người dân thành phố thì l...",
        year: "2004", imdb: "IMDb 7.7", age: "T16", part: "Phần 1", episode: "1h 39m",
        genres: ["Hành Động", "Hình Sự", "Hài", "Kỳ Ảo", "Viễn Tưởng"]
    }
];

let currentIndex = 0;
let autoChangeTimer;
let idleTimer;
let isInteracting = false;  // Cờ theo dõi trạng thái tương tác

// Lưu trạng thái của nút theo từng phim
let buttonStates = {};

window.onload = function() {
    changeImage(0); // Mặc định chọn ảnh đầu tiên
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            clearInterval(autoChangeTimer); // Xóa bộ đếm cũ
            changeImage(index);
            startAutoChange(); // Restart sau khi người dùng tương tác
        });
    });
    startAutoChange(); // Bắt đầu tự động chuyển ảnh

    // Thêm sự kiện khi người dùng di chuyển chuột hoặc click trong banner
    banner.addEventListener('mousemove', resetIdleTimer);
    banner.addEventListener('click', resetIdleTimer);

    // Sự kiện nút Play
    playBtn.addEventListener("click", function() {
        playBtn.classList.toggle("active");
        saveButtonState(currentIndex);
    });

    // Sự kiện nút Trái Tim
    favoriteBtn.addEventListener("click", function() {
        favoriteBtn.classList.toggle("active");
        let icon = favoriteBtn.querySelector("i");
        icon.classList.toggle("fas");
        icon.classList.toggle("far");
        saveButtonState(currentIndex);
    });

    // Sự kiện nút Info
    infoBtn.addEventListener("click", function() {
        infoBtn.classList.toggle("active");
        saveButtonState(currentIndex);
    });
};

// Hàm reset bộ đếm thời gian khi người dùng di chuyển chuột hoặc click
function resetIdleTimer() {
    isInteracting = true;  // Đặt cờ trạng thái là đang tương tác
    clearTimeout(idleTimer); // Xóa bộ đếm cũ
    clearInterval(autoChangeTimer); // Dừng chuyển ảnh tự động khi có tương tác
    // Đặt lại bộ đếm thời gian, sau 3 giây sẽ tự động chuyển đổi phim
    idleTimer = setTimeout(() => {
        if (!isInteracting) { // Kiểm tra nếu không có tương tác
            currentIndex = (currentIndex + 1) % movies.length; // Chuyển sang phim tiếp theo
            changeImage(currentIndex);
            startAutoChange(); // Bắt đầu lại chuyển ảnh tự động
        }
    }, 3000); // 3 giây không di chuyển chuột hoặc click

    // Reset lại trạng thái isInteracting sau 3 giây
    setTimeout(() => {
        isInteracting = false;
    }, 10000);
}

function changeImage(index) {
    let movie = movies[index];

    // Cập nhật nội dung phim
    banner.style.backgroundImage = `url('/images/${movie.image}')`;
    movieTitle.innerText = movie.title;
    movieDescription.innerText = movie.description;
    movieYear.innerText = movie.year;
    movieIMDB.innerText = movie.imdb;
    movieAge.innerText = movie.age;
    moviePart.innerText = movie.part;
    movieEpisode.innerText = movie.episode;

    // Cập nhật thể loại
    movieGenres.innerHTML = "";
    movie.genres.forEach(genre => {
        let genreTag = document.createElement("a");
        genreTag.className = "sub-tag";
        genreTag.innerText = genre;
        movieGenres.appendChild(genreTag);
    });

    // Cập nhật trạng thái active của ảnh nhỏ
    thumbnails.forEach(img => img.classList.remove("active"));
    thumbnails[index].classList.add("active");

    // 🔥 Reset trạng thái của các nút
    restoreButtonState(index);

    currentIndex = index;
}

function startAutoChange() {
    clearInterval(autoChangeTimer); // Xóa timer cũ trước khi đặt timer mới
    autoChangeTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % movies.length; // Chuyển sang phim tiếp theo
        changeImage(currentIndex);
    }, 10000);
}

// ✅ Hàm lưu trạng thái nút cho từng phim
function saveButtonState(index) {
    buttonStates[index] = {
        play: playBtn.classList.contains("active"),
        favorite: favoriteBtn.classList.contains("active"),
        info: infoBtn.classList.contains("active")
    };
}

// ✅ Hàm khôi phục trạng thái nút khi chuyển phim
function restoreButtonState(index) {
    let state = buttonStates[index] || { play: false, favorite: false, info: false };

    playBtn.classList.toggle("active", state.play);
    favoriteBtn.classList.toggle("active", state.favorite);
    infoBtn.classList.toggle("active", state.info);

    const icon = favoriteBtn.querySelector("i");
    icon.classList.toggle("fas", state.favorite);
    icon.classList.toggle("far", !state.favorite);
}

// GIữ nguyên viền khi nhấn hình ảnh
document.addEventListener("DOMContentLoaded", function () {
  const movieImages = document.querySelectorAll(".movie-list img");

  movieImages.forEach(img => {
      img.addEventListener("click", function () {
          // Xóa lớp 'active' khỏi tất cả ảnh
          movieImages.forEach(img => img.classList.remove("active"));
          
          // Thêm lớp 'active' vào ảnh được nhấn
          this.classList.add("active");
      });
  });
});


//ms
function changeImage(index) {
  let movie = movies[index];

  // 1. Áp dụng lớp "moving" để bắt đầu hiệu ứng chuyển trang
  applyMovingEffects();  // Gọi hàm để thêm lớp "moving" cho các phần tử

  // 2. Sau khi thay đổi, cập nhật nội dung và phần tử
  setTimeout(() => {
      // Cập nhật nội dung phim
      banner.style.backgroundImage = `url('/images/${movie.image}')`;
      movieTitle.innerText = movie.title;
      movieDescription.innerText = movie.description;
      movieYear.innerText = movie.year;
      movieIMDB.innerText = movie.imdb;
      movieAge.innerText = movie.age;
      moviePart.innerText = movie.part;
      movieEpisode.innerText = movie.episode;

      // Cập nhật thể loại
      movieGenres.innerHTML = "";
      movie.genres.forEach(genre => {
          let genreTag = document.createElement("a");
          genreTag.className = "sub-tag";
          genreTag.innerText = genre;
          movieGenres.appendChild(genreTag);
      });

      // 3. Cập nhật trạng thái active của ảnh nhỏ
      thumbnails.forEach(img => img.classList.remove("active"));
      thumbnails[index].classList.add("active");

      // 4. Khôi phục hiệu ứng chuyển cảnh
      setTimeout(() => {
          removeMovingEffects();
          movieTitle.classList.add("moving-active");
          movieDescription.classList.add("moving-active");
          movieYear.classList.add("moving-active");
          movieIMDB.classList.add("moving-active");
          movieAge.classList.add("moving-active");
          moviePart.classList.add("moving-active");
          movieEpisode.classList.add("moving-active");
          movieGenres.querySelectorAll(".sub-tag").forEach(tag => tag.classList.add("moving-active"));
          banner.classList.add("moving-active");
      }, 100); // Đảm bảo khôi phục sau khi nội dung thay đổi
  }, 500); // Thời gian trễ để nội dung thay đổi (tăng tốc độ chuyển cảnh)

  // 🔥 Reset trạng thái của các nút
  restoreButtonState(index);

  currentIndex = index;
}

// Hàm thêm hiệu ứng di chuyển
function applyMovingEffects() {
  movieTitle.classList.add("moving");
  movieDescription.classList.add("moving");
  movieYear.classList.add("moving");
  movieIMDB.classList.add("moving");
  movieAge.classList.add("moving");
  moviePart.classList.add("moving");
  movieEpisode.classList.add("moving");
  movieGenres.querySelectorAll(".sub-tag").forEach(tag => tag.classList.add("moving"));
  banner.classList.add("moving");
}

// Hàm loại bỏ hiệu ứng di chuyển
function removeMovingEffects() {
  movieTitle.classList.remove("moving");
  movieDescription.classList.remove("moving");
  movieYear.classList.remove("moving");
  movieIMDB.classList.remove("moving");
  movieAge.classList.remove("moving");
  moviePart.classList.remove("moving");
  movieEpisode.classList.remove("moving");
  movieGenres.querySelectorAll(".sub-tag").forEach(tag => tag.classList.remove("moving"));
  banner.classList.remove("moving");
}

//lmao




document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const moviesPerPage = 12; // Số lượng phim mỗi trang
  let currentPage = 1;
  const movies = document.querySelectorAll(".movie-item");
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  function showPage(page) {
    movies.forEach((movie, index) => {
      if (index >= (page - 1) * moviesPerPage && index < page * moviesPerPage) {
        movie.style.display = "block";
      } else {
        movie.style.display = "none";
      }
    });
    document.getElementById("pageNumber").textContent = page;
  }

  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("DOMContentLoaded", function () {
  const filterModal = document.getElementById("filterModal");
  const openFilterBtn = document.getElementById("openFilter");
  const closeFilterBtn = document.querySelector(".close");
  const applyFilterBtn = document.getElementById("applyFilter");
  const yearFilter = document.getElementById("yearFilter");
  const movieItems = document.querySelectorAll(".movie-item");

  // Hiển thị cửa sổ bộ lọc
  openFilterBtn.addEventListener("click", function () {
    filterModal.classList.add("show");
  });

  // Ẩn cửa sổ bộ lọc
  closeFilterBtn.addEventListener("click", function () {
    filterModal.classList.remove("show");
  });

  // Đóng bộ lọc khi click bên ngoài
  window.addEventListener("click", function (e) {
    if (e.target === filterModal) {
      filterModal.classList.remove("show");
    }
  });

  // Lọc phim theo năm
  applyFilterBtn.addEventListener("click", function () {
    const selectedYear = yearFilter.value;

    movieItems.forEach((item) => {
      const movieYear = item.getAttribute("data-year");

      if (!selectedYear || movieYear === selectedYear) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    filterModal.classList.remove("show");
  });
});
document.getElementById("applyFilter").addEventListener("click", function () {
  const year = document.getElementById("yearFilter").value;
  const country = document.getElementById("countryFilter").value;
  const type = document.getElementById("typeFilter").value;
  const rating = document.getElementById("ratingFilter").value;
  const genre = document.getElementById("genreFilter").value;
  const version = document.getElementById("versionFilter").value;
  const productionYear = document.getElementById("productionYearFilter").value;
  const sort = document.getElementById("sortFilter").value;

  const filters = {
    year,
    country,
    type,
    rating,
    genre,
    version,
    productionYear,
    sort,
  };

  console.log("Bộ lọc đã áp dụng:", filters);
  applyFilters(filters);
});

// Hàm áp dụng bộ lọc (giả lập)
function applyFilters(filters) {
  let movies = document.querySelectorAll(".movie-item");

  movies.forEach((movie) => {
    let show = true;

    if (filters.year && movie.dataset.year !== filters.year) show = false;
    if (filters.country && movie.dataset.country !== filters.country)
      show = false;
    if (filters.type && movie.dataset.type !== filters.type) show = false;
    if (filters.rating && movie.dataset.rating !== filters.rating) show = false;
    if (filters.genre && movie.dataset.genre !== filters.genre) show = false;
    if (filters.version && movie.dataset.version !== filters.version)
      show = false;
    if (
      filters.productionYear &&
      movie.dataset.productionYear !== filters.productionYear
    )
      show = false;

    movie.style.display = show ? "block" : "none";
  });

  // Sắp xếp phim theo bộ lọc
  sortMovies(filters.sort);
}

// Hàm sắp xếp phim
function sortMovies(sortBy) {
  let movieContainer = document.querySelector(".movie-grid");
  let movies = Array.from(movieContainer.children);

  movies.sort((a, b) => {
    if (sortBy === "latest") return b.dataset.year - a.dataset.year;
    if (sortBy === "oldest") return a.dataset.year - b.dataset.year;
    if (sortBy === "topRated") return b.dataset.rating - a.dataset.rating;
  });

  movieContainer.innerHTML = "";
  movies.forEach((movie) => movieContainer.appendChild(movie));
}
document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("movieTooltip");
  const tooltipImage = document.getElementById("tooltipImage");
  const tooltipTitle = document.getElementById("tooltipTitle");
  const tooltipYear = document.getElementById("tooltipYear");
  const tooltipDesc = document.getElementById("tooltipDesc");
  const tooltipIMDb = document.querySelector(".imdb-rating strong");
  const tooltipAge = document.querySelector(".age-rating");
  const tooltipDuration = document.querySelector(".duration");
  const tooltipGenres = document.querySelector(".movie-genres");

  document.querySelectorAll(".movie-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Lấy dữ liệu từ `data-*`
      const img = this.dataset.image;
      const title = this.dataset.title;
      const year = this.dataset.year;
      const desc = this.dataset.desc;
      const imdb = this.dataset.imdb;
      const age = this.dataset.age;
      const duration = this.dataset.duration;
      const genres = this.dataset.genres;

      // Cập nhật tooltip
      tooltipImage.src = img;
      tooltipTitle.innerText = title;
      tooltipYear.innerText = `Năm: ${year}`;
      tooltipDesc.innerText = desc;
      tooltipIMDb.innerText = imdb;
      tooltipAge.innerText = age;
      tooltipDuration.innerText = duration;
      tooltipGenres.innerHTML = genres
        .split(", ")
        .map((genre) => `<span>${genre}</span>`)
        .join(" • ");

      // Lấy vị trí của bộ phim
      const rect = this.getBoundingClientRect();
      const tooltipWidth = 400; // Chiều rộng tooltip
      const spacing = 1; // Khoảng cách giữa tooltip và bộ phim

      // Kiểm tra có đủ không gian bên phải không
      let leftPosition = rect.right + spacing;

      // Nếu không đủ chỗ bên phải, chuyển tooltip sang bên trái
      if (leftPosition + tooltipWidth > window.innerWidth) {
        leftPosition = rect.left - tooltipWidth - spacing;

        // Nếu bị tràn qua mép trái màn hình, điều chỉnh lại cho hợp lý
        if (leftPosition < spacing) {
          leftPosition = spacing; // Giữ tooltip không bị đẩy quá xa
        }
      }

      // Cập nhật vị trí sát với bộ phim
      tooltip.style.left = `${leftPosition}px`;
      tooltip.style.top = `${rect.top + window.scrollY}px`; // Điều chỉnh theo cuộn trang
      tooltip.style.display = "block";
    });
  });

  // Giữ tooltip khi rê chuột vào
  tooltip.addEventListener("mouseenter", function () {
    tooltip.style.display = "block";
  });

  // Ẩn tooltip khi di chuột ra ngoài cả phim và tooltip
  document.addEventListener("mousemove", function (event) {
    if (
      !tooltip.contains(event.target) &&
      !event.target.closest(".movie-item")
    ) {
      tooltip.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các mục quốc gia trong dropdown
  document
    .querySelectorAll(".country-dropdown .dropdown-item")
    .forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định

        const country = this.getAttribute("href").split("=")[1]; // Lấy tên quốc gia từ URL
        if (country) {
          window.location.href = `quoc-gia.html?country=${country}`;
        }
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const countryBtn = document.getElementById("countryButton"); // Nút "Quốc gia"
  const countryDropdown = document.getElementById("countryDropdown"); // Danh sách quốc gia

  countryBtn.addEventListener("click", function () {
    countryDropdown.classList.toggle("show"); // Hiển thị hoặc ẩn danh sách
  });

  // Ẩn dropdown nếu click ra ngoài
  document.addEventListener("click", function (event) {
    if (
      !countryBtn.contains(event.target) &&
      !countryDropdown.contains(event.target)
    ) {
      countryDropdown.classList.remove("show");
    }
  });
});

//lòe ngẫu nhiên h1
document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector(".title-h1");
  const glowEffect = title.querySelector("::after");

  setInterval(() => {
    let randX = Math.random() * 100;
    let randY = Math.random() * 100;

    glowEffect.style.left = randX + "%";
    glowEffect.style.top = randY + "%";
  }, 2000);
});

//hiệu ứng ms list film
// Đảm bảo đã tải Bootstrap JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Khởi tạo Bootstrap carousel
  const carousel = new bootstrap.Carousel(document.querySelector('#carouselHàn'), {
      interval: 3000,  // Tự động chuyển mỗi 3 giây
      ride: 'carousel'
  });

  // Các sự kiện điều khiển carousel khi người dùng tương tác
  const carouselElement = document.getElementById('carouselHàn');
  let isInteracting = false;
  let timeout;

  // Khi người dùng tương tác (di chuyển chuột, click, vv.)
  function resetAutoSlide() {
      if (timeout) {
          clearTimeout(timeout);  // Hủy bỏ thời gian tự động nếu có tương tác
      }

      // Khởi động lại thời gian đếm ngược để chuyển đổi tự động sau 3s
      timeout = setTimeout(() => {
          carousel.next();  // Chuyển sang movie tiếp theo nếu không có tương tác sau 3s
      }, 10000);
  }

  // Lắng nghe các sự kiện tương tác
  carouselElement.addEventListener('mousemove', resetAutoSlide);
  carouselElement.addEventListener('click', resetAutoSlide);
  carouselElement.addEventListener('touchstart', resetAutoSlide);
  
  // Thực hiện khởi tạo tự động sau 3s nếu không có tương tác
  resetAutoSlide();
});

//ĐỔI QUỐC GIA SANG PHIM TƯƠNG ỨNG
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script chọn quốc gia đã tải!");

  // Xử lý sự kiện chuyển trang khi chọn quốc gia
  const countryItems = document.querySelectorAll(".dropdown-item");

  countryItems.forEach((item) => {
      item.addEventListener("click", function (event) {
          event.preventDefault(); // Ngăn chặn hành vi mặc định

          const link = this.getAttribute("href"); // Lấy link trang
          console.log("Chuyển hướng đến:", link); // Kiểm tra trong Console

          if (link) {
              window.location.href = link; // Chuyển hướng
          }
      });
  });
});
