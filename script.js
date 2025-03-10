$(document).ready(function() {
  var i = 0;

  var Playlist = [
    {
      Artist: "ZAARA",
      Song: "ZAARA",
      Album: "ZAARA",
      Src:
        "ZAARA.mp3"
    },
    {
      Artist: "Ed Sheeran",
      Song: "Shape Of You",
      Album: "Divide",
      Src:
        "https://ncs-files-1.nyc3.digitaloceanspaces.com/mp3s/Waysons%20-%20Eternal%20Minds.mp3"
    },
    {
      Artist: "Backstreet Boys",
      Song: "Unmistakable",
      Album: "Unbreakable",
      Src:
        "https://ncs-files-1.nyc3.digitaloceanspaces.com/mp3s/High%20Maintenance%20-%20Change%20Your%20Ways%20%28feat.%20Charlotte%20Haining%29.mp3"
    }
  ];

  $("#songName").html(Playlist[i]["Song"]);
  $("source").attr("src", Playlist[i]["Src"]);
  $(".artist-name").html(Playlist[i]["Artist"]);
  $(".list-group-item:nth-child(" + i + 2 + ")").addClass("active");

  $(".carousel").carousel({
    interval: false
  });

  var audio = $("audio").get(0);
  audio.load();

  $("#play-pause").on("click", function() {
    if (this.value == 1) {
      $("audio")
        .get(0)
        .play();
      this.value = 0;
      $(this).html("<i style='color:#007bff' class='fa fa-pause'></i>");
      $(".range-indicator").toggleClass("range-indicator-pause");
      $(".active").attr("style", "");
    } else {
      $("audio")
        .get(0)
        .pause();
      this.value = 1;
      $(this).html("<i class='fa fa-play'></i>");
      $(".range-indicator").addClass("range-indicator-pause");
      $(".active").attr("style", "background-color:#F44336a1");
    }
  });

  $("#next").on("click", function() {
    i++;
    if (i == Playlist.length) i = 0;
    $(".carousel").carousel("next");
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
    var x = String(parseInt(i) + 2);
    var y = String(parseInt(x) - 1);
    str = "nth-child(" + y + ")";
    if (x == 2) str = "last-child()";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });

  $("#prev").on("click", function() {
    i--;
    if (i == -1) {
      i = Playlist.length - 1;
    }
    $(".carousel").carousel("prev");
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
    var x = String(parseInt(i) + 2);
    var y = String(parseInt(x) + 1);
    str = "nth-child(" + y + ")";
    if (x == Playlist.length + 1) str = "nth-child(2)";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });

  audio.addEventListener("timeupdate", function() {
    var cmin = Math.floor(this.currentTime / 60);
    if (cmin < 10) cmin = "0" + cmin;
    var csec = Math.floor(this.currentTime) % 60;
    if (csec < 10) csec = "0" + csec;
    var dmin = Math.floor(this.duration / 60);
    if (dmin < 10) dmin = "0" + dmin;
    var dsec = Math.floor(this.duration) % 60;
    if (dsec < 10) dsec = "0" + dsec;
    $("#tracktime").html(cmin + ":" + csec + " / " + dmin + ":" + dsec);
    $(".range-indicator").attr(
      "style",
      "width:" +
        Math.floor(this.currentTime) / Math.floor(this.duration) * 100 +
        "%"
    );

    if (this.currentTime == this.duration) {
      $("#next").trigger("click");
    }
  });

  $("#inputrange").attr("max", Math.floor($("audio").get(0).duration));

  $("#inputrange").on("click", function() {
    $("audio").get(0).currentTime =
      this.value * $("audio").get(0).duration / 100;
  });

  $(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      $("#play-pause").trigger("click");
    }
  });

  $(".list-group-item").on("click", function() {
    var x = String(parseInt(i) + 2);
    $(".list-group-item:nth-child(" + x + ")").removeClass("active");
    $(".list-group-item:nth-child(" + x + ")").attr("style", "");
    i = this.value;
    var x1 = String(parseInt(i) + 2);
    $(".list-group-item:nth-child(" + x1 + ")").addClass("active");
    $(".carousel").carousel(parseInt(i));
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
  });

  $("#playlist-btn").on("click", function() {
    if (this.value == 0) {
      $(".playlist").attr("style", "height:298px");
      this.value = 1;
      $(this).html('<i class="fa fa-times">');
    } else if (this.value == 1) {
      $(".playlist").attr("style", "");
      this.value = 0;
      $(this).html('<i class="fa fa-bars">');
    }
  });
});