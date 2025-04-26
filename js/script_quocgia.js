// Khi nhấn vào nút "Bộ Lọc", hiển thị phần tử .khung
document.getElementById('openFilter').addEventListener('click', function(event) {
  event.stopPropagation(); // Ngừng sự kiện click để tránh ẩn khung khi nhấn vào nút
  var khung = document.querySelector('.khung');
  khung.style.display = (khung.style.display === 'block') ? 'none' : 'block';
});

// Khi di chuyển chuột ra ngoài vùng .khung, ẩn phần tử .khung
document.addEventListener('click', function(event) {
  var filterBox = document.querySelector('.khung');
  var filterButton = document.getElementById('openFilter');
  
  // Nếu click ra ngoài phần tử .khung và nút "Bộ Lọc", ẩn .khung
  if (!filterBox.contains(event.target) && event.target !== filterButton) {
      filterBox.style.display = 'none';
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////
// Lắng nghe sự kiện click trên tất cả các li trong danh sách
document.querySelectorAll('.DS li').forEach(function(item) {
  item.addEventListener('click', function() {
      // Xóa lớp 'selected' cho tất cả các mục trong danh sách
      document.querySelectorAll('.DS li').forEach(function(li) {
          li.classList.remove('selected');
      });

      // Thêm lớp 'selected' vào mục được nhấn
      item.classList.add('selected');
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Xử lý sự kiện khi nhấn vào năm sản xuất
document.querySelectorAll('.DSQG li').forEach(function(item) {
  item.addEventListener('click', function() {
      var selectedYear = item.textContent; // Lấy năm đã chọn
      filterMovies(selectedYear, null); // Lọc theo năm và không chọn thể loại
  });
});

// Xử lý sự kiện khi nhấn vào thể loại
document.querySelectorAll('.DSTL li').forEach(function(item) {
  item.addEventListener('click', function() {
      var selectedGenre = item.textContent; // Lấy thể loại đã chọn
      filterMovies(null, selectedGenre); // Lọc theo thể loại và không chọn năm
  });
});

// Hàm lọc phim theo năm và thể loại
function filterMovies(year, genre) {
  var movies = document.querySelectorAll('.movie-item');

  movies.forEach(function(movie) {
      var movieYear = movie.getAttribute('data-year');
      var movieGenres = movie.getAttribute('data-genres');

      // Kiểm tra nếu năm hoặc thể loại của phim phù hợp với lựa chọn
      var yearMatch = year ? movieYear === year : true;
      var genreMatch = genre ? movieGenres.includes(genre) : true;

      // Hiển thị phim nếu khớp với lựa chọn, ẩn nếu không khớp
      if (yearMatch && genreMatch) {
          movie.style.display = 'block';
      } else {
          movie.style.display = 'none';
      }
  });
}

