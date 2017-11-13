document.getElementById('myForm').addEventListener('submit', simpanBookmark);

function simpanBookmark(e) {
  var siteName = document.getElementById('namaSitus').value;
  var siteUrl = document.getElementById('linkSitus').value;
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if (localStorage.getItem('bookmarks') === null) {
    //initial array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  //hapus form
  document.getElementById('myForm').reset();
  //muat ulang
  muatBookmark();
  // Prevent form from submitting
  e.preventDefault();
}

function muatBookmark() {
  //get from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get from html
  var hasilBookmarks = document.getElementById('hasilBookmarks');
  //coba set

  hasilBookmarks.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    hasilBookmarks.innerHTML += '<div class="card">';
    hasilBookmarks.innerHTML += '<div class="card-body"><h3>' + name +
      '<a class="btn btn-primary" target="_blank" href="http://' + url + '">Kunjungi</a>' +
      '<a onclick="hapusBookmark(\'' + url + '\')" class="btn btn-danger"  href="#">Hapus</a>' +
      '</h3>' +
      '</div>';
    hasilBookmarks.innerHTML += '</div>';
  }
}

function hapusBookmark(url) {
  //get from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //search bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //muat ulang
  muatBookmark();
}
