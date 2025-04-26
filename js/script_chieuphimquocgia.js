document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const episodeButtons = document.querySelectorAll(".episode-btn");

  episodeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Lấy URL video từ thuộc tính data-src
      const newVideoSrc = this.getAttribute("data-src");

      // Cập nhật video player
      videoPlayer.src = newVideoSrc;
      videoPlayer.play();

      // Xóa class 'active' khỏi tất cả các nút
      episodeButtons.forEach((btn) => btn.classList.remove("active"));

      // Đánh dấu tập đang xem
      this.classList.add("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Tốc độ kéo
    carousel.scrollLeft = scrollLeft - walk;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const commentList = document.getElementById("commentList");

  // Danh sách bình luận giả
  const fakeComments = [
    { user: "Nguyễn Văn A", text: "Phim này hay quá, đúng gu mình luôn!" },
    { user: "Trần Thị B", text: "Ai có link full không ạ?" },
    { user: "Lê Minh C", text: "Nhạc phim nghe cũng đỉnh quá!" },
    {
      user: "Phạm Hoàng D",
      text: "Tập 6 có nhiều plot twist thật sự bất ngờ.",
    },
    { user: "Đặng Tuấn E", text: "Ai hóng tập 7 không?" },
    { user: "Hồ Thị F", text: "Nhân vật phản diện diễn quá xuất sắc!" },
  ];

  // Hiển thị bình luận giả
  function loadFakeComments() {
    fakeComments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
                <img src="https://i.pravatar.cc/40?u=${comment.user}" alt="Avatar">
                <div class="comment-content">
                    <div class="user">${comment.user}</div>
                    <div class="text">${comment.text}</div>
                </div>
            `;
      commentList.appendChild(commentElement);
    });
  }

  loadFakeComments(); // Gọi hàm để load bình luận giả khi trang tải xong

  // Xử lý khi người dùng gửi bình luận mới
  document
    .getElementById("submitComment")
    .addEventListener("click", function () {
      const commentInput = document.getElementById("commentInput");
      const commentText = commentInput.value.trim();

      if (commentText !== "") {
        const newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `
                <img src="https://i.pravatar.cc/40?u=guest" alt="Avatar">
                <div class="comment-content">
                    <div class="user">Bạn</div>
                    <div class="text">${commentText}</div>
                </div>
            `;
        commentList.prepend(newComment);
        commentInput.value = ""; // Xóa nội dung ô nhập sau khi gửi
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const favoriteBtn = document.getElementById("favoriteBtn");
  const shareBtn = document.getElementById("shareBtn");
  const autoNextToggle = document.getElementById("autoNext");
  const cinemaModeToggle = document.getElementById("cinemaMode");
  const episodeButtons = document.querySelectorAll(".episode-btn");

  // 🟢 Yêu thích phim (Lưu vào localStorage)
  favoriteBtn.addEventListener("click", function () {
    let favorite = localStorage.getItem("favoriteMovie") === "true";
    favorite = !favorite;
    localStorage.setItem("favoriteMovie", favorite);
    favoriteBtn.classList.toggle("active", favorite);
  });

  // 🔄 Tự động chuyển tập
  videoPlayer.addEventListener("ended", function () {
    if (autoNextToggle.checked) {
      const activeEpisode = document.querySelector(".episode-btn.active");
      if (activeEpisode && activeEpisode.nextElementSibling) {
        activeEpisode.nextElementSibling.click();
      }
    }
  });

  // 🔗 Chia sẻ link phim
  shareBtn.addEventListener("click", function () {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert("📋 Link phim đã được sao chép!");
    });

    // Toggle trạng thái active cho nút Chia sẻ
    shareBtn.classList.toggle("active");
  });

  // 🟡 Load trạng thái yêu thích từ localStorage
  if (localStorage.getItem("favoriteMovie") === "true") {
    favoriteBtn.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cinemaModeToggle = document.getElementById("cinemaMode");
  const body = document.body;

  cinemaModeToggle.addEventListener("change", function () {
    if (this.checked) {
      let overlay = document.createElement("div");
      overlay.classList.add("cinema-mode-overlay");
      overlay.setAttribute("id", "cinemaOverlay");
      body.appendChild(overlay);
    } else {
      let overlay = document.getElementById("cinemaOverlay");
      if (overlay) overlay.remove();
    }
  });
});
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

// Đánh giá
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".stars span");
  const averageRatingDisplay = document.getElementById("average-rating");
  const totalRatingsDisplay = document.getElementById("total-ratings");

  // Lấy dữ liệu đánh giá từ localStorage
  let ratingsData = JSON.parse(localStorage.getItem("movieRatings")) || {
    total: 0,
    sum: 0,
    userRating: null,
  };

  function updateRatingDisplay() {
    let average = ratingsData.total
      ? (ratingsData.sum / ratingsData.total).toFixed(1)
      : 0;
    averageRatingDisplay.textContent = average;
    totalRatingsDisplay.textContent = ratingsData.total;

    // Hiển thị lại số sao đã chọn
    stars.forEach((star) => {
      let starValue = parseInt(star.getAttribute("data-value"));
      star.classList.toggle("selected", starValue === ratingsData.userRating);
      star.classList.toggle("active", starValue <= ratingsData.userRating);
    });
  }

  function highlightStars(value) {
    stars.forEach((star) => {
      let starValue = parseInt(star.getAttribute("data-value"));
      star.classList.toggle("active", starValue <= value);
    });
  }

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      let rating = parseInt(this.getAttribute("data-value"));
      highlightStars(rating);
    });

    star.addEventListener("mouseleave", function () {
      highlightStars(ratingsData.userRating || 0);
    });

    star.addEventListener("click", function () {
      let rating = parseInt(this.getAttribute("data-value"));

      if (!ratingsData.userRating) {
        // Nếu đây là lần đầu đánh giá, thêm mới
        ratingsData.total += 1;
        ratingsData.sum += rating;
      } else {
        // Nếu đã đánh giá trước đó, cập nhật lại tổng điểm
        ratingsData.sum = ratingsData.sum - ratingsData.userRating + rating;
      }

      // Cập nhật đánh giá của người dùng
      ratingsData.userRating = rating;
      localStorage.setItem("movieRatings", JSON.stringify(ratingsData));

      updateRatingDisplay();
    });
  });

  updateRatingDisplay();
});
