const numDivs = 36;
const maxHits = 10;
const penPoint = 0.1;
let hits = 0;
let totalPoints = 0;
let misses = 0;
let firstHitTime = 0;
let playing = false;

function gameRound() {
  $(".miss").text("");
  $(".target").text("");
  $(".target").removeClass('target');
  $(".miss").removeClass('miss');
  if (hits === maxHits) {
    endGame();
  }
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(hits + 1);
}

function endGame() {
  $("#main-screen").addClass('d-none');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalPenalties = Number(misses).toPrecision(3);
  let totalScore = Number(totalPlayedSeconds-totalPenalties).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-penalties").text(totalPenalties);
  $("#total-scored").text(totalScore);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if (!playing) return;
  $(".miss").text("");
  $(".miss").removeClass('miss');
  
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    gameRound();
  }
  else {
    misses+=penPoint;
    $(event.target).addClass('miss');
    $(event.target).text("-"+Number(misses).toPrecision(2));
  }
}

function initGame(event){
  $(event.target).prop('disabled', true);
  hits = 0;
  misses = 0;
  playing = true;
  firstHitTime = getTimestamp();
  gameRound()
}

function init() {
  $("#main-field").click(handleClick);
  $("#btn-start").click(initGame);
  $("#btn-restart").click(function() {
    location.reload();
  });
}

$(document).ready(init);
