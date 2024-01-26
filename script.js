// Function to reset game 
function reloadGame() { 
  location.reload(); 
}

let playerTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Helper function to pinpoint the index of the box
function pinpointIndex(id) {
  switch (id) {
    case 'b00':
      return 0;
    case 'b01':
      return 1;
    case 'b02':
      return 2;
    case 'b10':
      return 3;
    case 'b11':
      return 4;
    case 'b12':
      return 5;
    case 'b20':
      return 6;
    case 'b21':
      return 7;
    case 'b22':
      return 8;
    default:
      return -1;
  }
}

// Helper function to pinpoint the id of the index
function pinpointId(index) {
  switch (index) {
    case 0:
      return 'b00';
    case 1:
      return 'b01';
    case 2:
      return 'b02';
    case 3:
      return 'b10';
    case 4:
      return 'b11';
    case 5:
      return 'b12';
    case 6:
      return 'b20';
    case 7:
      return 'b21';
    case 8:
      return 'b22';
    default:
      return -1;
  }
}

// Function to make a move
function makeAMove(id) {
  if (playerTurn) {
    document.getElementById(id).value = "X";
    document.getElementById(id).disabled = true;
    playerTurn = false;
    board[pinpointIndex(id)] = 'X';
  }

  checkWin();
  fakeAIMove();
}

// Function to make a move for fake AI
function fakeAIMove() {
  var b00, b01, b02, b10, b11, b12, b20, b21, b22; 
  b00 = document.getElementById("b00"); 
  b01 = document.getElementById("b01"); 
  b02 = document.getElementById("b02"); 
  b10 = document.getElementById("b10"); 
  b11 = document.getElementById("b11"); 
  b12 = document.getElementById("b12"); 
  b20 = document.getElementById("b20"); 
  b21 = document.getElementById("b21"); 
  b22 = document.getElementById("b22");

  const firstMove = board.filter(x => x == 'X').length == 1;

  if (firstMove) {
    if (b11.value === "") {
      b11.value = "0";
      b11.disabled = true;
      playerTurn = true;
      board[pinpointIndex('b11')] = '0';
    } else {
      const id = pinpointId(board.indexOf(''))
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[pinpointIndex(id)] = '0';
    }
  } else {
    let horizontalFlag = true;
    let horizontalStart = 0;
    let horizontalMid = 1;
    let horizontalEnd = 2;
    while (horizontalFlag && !playerTurn) {
      const startBtn = board[horizontalStart];
      const midBtn = board[horizontalMid];
      const endBtn = board[horizontalEnd];

      if (startBtn === 'X' && midBtn === 'X' && endBtn === '') {
        const id = pinpointId(horizontalEnd);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[horizontalEnd] = '0';
        horizontalFlag = false;
      } else if (startBtn === 'X' && midBtn === '' && endBtn === 'X') {
        const id = pinpointId(horizontalMid);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[horizontalMid] = '0';
        horizontalFlag = false;
      } else if (startBtn === '' && midBtn === 'X' && endBtn === 'X') {
        const id = pinpointId(horizontalStart);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[horizontalStart] = '0';
        horizontalFlag = false;
      }

      horizontalStart += 3;
      horizontalMid += 3;
      horizontalEnd += 3;

      if (horizontalEnd > 8) {
        horizontalFlag = false;
      }
    }

    let verticalFlag = true;
    let verticalStart = 0;
    let verticalMid = 3;
    let verticalEnd = 6;
    while (verticalFlag && !playerTurn) {
      const startBtn = board[verticalStart];
      const midBtn = board[verticalMid];
      const endBtn = board[verticalEnd];

      if (startBtn === 'X' && midBtn === 'X' && endBtn === '') {
        const id = pinpointId(verticalEnd);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[verticalEnd] = '0';
        verticalFlag = false;
      } else if (startBtn === 'X' && midBtn === '' && endBtn === 'X') {
        const id = pinpointId(verticalMid);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[verticalMid] = '0';
        verticalFlag = false;
      } else if (startBtn === '' && midBtn === 'X' && endBtn === 'X') {
        const id = pinpointId(verticalStart);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[verticalStart] = '0';
        verticalFlag = false;
      }

      verticalStart += 1;
      verticalMid += 1;
      verticalEnd += 1;

      if (verticalEnd > 8) {
        verticalFlag = false;
      }
    }

    const startDiagBtn = board[0];
    const midDiagBtn = board[4];
    const endDiagBtn = board[8];

    if (startDiagBtn === 'X' && midDiagBtn === 'X' && endDiagBtn === '' && !playerTurn) {
      const id = pinpointId(8);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[8] = '0';
    } else if (startDiagBtn === 'X' && midDiagBtn === '' && endDiagBtn === 'X' && !playerTurn) {
      const id = pinpointId(4);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[4] = '0';
    } else if (startDiagBtn === '' && midDiagBtn === 'X' && endDiagBtn === 'X' && !playerTurn) {
      const id = pinpointId(0);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[0] = '0';
    }

    const startRevDiagBtn = board[2];
    const midRevDiagBtn = board[4];
    const endRevDiagBtn = board[6];

    if (startRevDiagBtn === 'X' && midRevDiagBtn === 'X' && endRevDiagBtn === '' && !playerTurn) {
      const id = pinpointId(6);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[6] = '0';
    } else if (startRevDiagBtn === 'X' && midRevDiagBtn === '' && endRevDiagBtn === 'X' && !playerTurn) {
      const id = pinpointId(4);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[4] = '0';
    } else if (startRevDiagBtn === '' && midRevDiagBtn === 'X' && endRevDiagBtn === 'X' && !playerTurn) {
      const id = pinpointId(2);
      document.getElementById(id).value = '0';
      document.getElementById(id).disabled = true;
      playerTurn = true;
      board[2] = '0';
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '' && !playerTurn) {
        const id = pinpointId(i);
        document.getElementById(id).value = '0';
        document.getElementById(id).disabled = true;
        playerTurn = true;
        board[i] = '0';
        randomFlag = false;
        break;
      }
    }
  }
  
  checkWin();
}

// Function called whenever user tab on any box 
function checkWin() { 
  
  // Setting DOM to all boxes or input field 
  var b00, b01, b02, b10, b11, b12, b20, b21, b22; 
  b00 = document.getElementById("b00").value; 
  b01 = document.getElementById("b01").value; 
  b02 = document.getElementById("b02").value; 
  b10 = document.getElementById("b10").value; 
  b11 = document.getElementById("b11").value; 
  b12 = document.getElementById("b12").value; 
  b20 = document.getElementById("b20").value; 
  b21 = document.getElementById("b21").value; 
  b22 = document.getElementById("b22").value; 

  var b00btn, b01btn, b02btn, b10btn, b11btn,  
      b12btn, b20btn, b21btn, b22btn; 
        
  b00btn = document.getElementById("b00"); 
  b01btn = document.getElementById("b01"); 
  b02btn = document.getElementById("b02"); 
  b10btn = document.getElementById("b10"); 
  b11btn = document.getElementById("b11"); 
  b12btn = document.getElementById("b12"); 
  b20btn = document.getElementById("b20"); 
  b21btn = document.getElementById("b21"); 
  b22btn = document.getElementById("b22"); 

  // Checking if Player X won or not and after 
  // that disabled all the other fields 
  if (b00 == 'X' && b01 == 'X' && b02 == 'X') { 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b00btn.style.color = "green"; 
      b01btn.style.color = "green"; 
      b02btn.style.color = "green"; 
  } 
  else if (b00 == 'X' && b10 == 'X' && b20 == 'X') { 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b00btn.style.color = "green"; 
      b10btn.style.color = "green"; 
      b20btn.style.color = "green"; 
  } 
  else if (b20 == 'X' && b21 == 'X' && b22 == 'X') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 

      b20btn.style.color = "green"; 
      b21btn.style.color = "green"; 
      b22btn.style.color = "green"; 
  } 
  else if (b02 == 'X' && b12 == 'X' && b22 == 'X') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 

      b02btn.style.color = "green"; 
      b12btn.style.color = "green"; 
      b22btn.style.color = "green"; 
  } 
  else if (b00 == 'X' && b11 == 'X' && b22 == 'X') { 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 

      b00btn.style.color = "green"; 
      b11btn.style.color = "green"; 
      b22btn.style.color = "green"; 
  } 
  else if (b02 == 'X' && b11 == 'X' && b20 == 'X') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b02btn.style.color = "green"; 
      b11btn.style.color = "green"; 
      b20btn.style.color = "green"; 
  } 
  else if (b01 == 'X' && b11 == 'X' && b21 == 'X') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b22btn.disabled = true; 

      b01btn.style.color = "green"; 
      b11btn.style.color = "green"; 
      b21btn.style.color = "green"; 
  } 
  else if (b10 == 'X' && b11 == 'X' && b12 == 'X') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b10btn.style.color = "green"; 
      b11btn.style.color = "green"; 
      b12btn.style.color = "green"; 
  } 

  // Checking for Fake AI, did Fake AI won or 
  // not and after that disabled all the other fields 
  else if (b00 == '0' && b01 == '0' && b02 == '0') { 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b00btn.style.color = "red"; 
      b01btn.style.color = "red"; 
      b02btn.style.color = "red"; 
  } 
  else if (b00 == '0' && b10 == '0' && b20 == '0') { 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b00btn.style.color = "red"; 
      b10btn.style.color = "red"; 
      b20btn.style.color = "red"; 
  } 
  else if (b20 == '0' && b21 == '0' && b22 == '0') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b12btn.disabled = true; 

      b20btn.style.color = "red"; 
      b21btn.style.color = "red"; 
      b22btn.style.color = "red"; 
  } 
  else if (b02 == '0' && b12 == '0' && b22 == '0') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b10btn.disabled = true; 
      b11btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 
      b02btn.style.color = "red"; 
      b12btn.style.color = "red"; 
      b22btn.style.color = "red"; 
  } 
  else if (b00 == '0' && b11 == '0' && b22 == '0') { 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 

      b00btn.style.color = "red"; 
      b11btn.style.color = "red"; 
      b22btn.style.color = "red"; 
  } 
  else if (b02 == '0' && b11 == '0' && b20 == '0') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b02btn.style.color = "red"; 
      b11btn.style.color = "red"; 
      b20btn.style.color = "red"; 
  } 
  else if (b01 == '0' && b11 == '0' && b21 == '0') { 
      b00btn.disabled = true; 
      b02btn.disabled = true; 
      b10btn.disabled = true; 
      b12btn.disabled = true; 
      b20btn.disabled = true; 
      b22btn.disabled = true; 

      b01btn.style.color = "red"; 
      b11btn.style.color = "red"; 
      b21btn.style.color = "red"; 
  } 
  else if (b10 == '0' && b11 == '0' && b12 == '0') { 
      b00btn.disabled = true; 
      b01btn.disabled = true; 
      b02btn.disabled = true; 
      b20btn.disabled = true; 
      b21btn.disabled = true; 
      b22btn.disabled = true; 

      b10btn.style.color = "red"; 
      b11btn.style.color = "red"; 
      b12btn.style.color = "red"; 
  }
} 

$(document).ready(function () {
    $(window).scroll(function () {
      //  sticky navbar on scroll script  //
      if (this.scrollY > 20) {
        $(".navbar").addClass("sticky");
      } else {
        $(".navbar").removeClass("sticky");
      }
  
      //  scroll-up button show/hide script  //
      if (this.scrollY > 500) {
        $(".scroll-up-btn").addClass("show");
      } else {
        $(".scroll-up-btn").removeClass("show");
      }
    });
  
    //  slide-up script  //
  
    $(".scroll-up-btn").click(function () {
      $("html").animate({ scrollTop: 0 });
      //  removing smooth scroll on slide-up button click  //
      $("html").css("scrollBehavior", "auto");
    });
  
    $(".navbar .menu li a").click(function () {
      //  Smooth scroll on Menu Items click  //
  
      $("html").css("scrollBehavior", "smooth");
    });
  
    //  Toggle Navbar  //
  
    $(".menu-btn").click(function () {
      $(".navbar .menu").toggleClass("active");
      $(".menu-btn i").toggleClass("active");
    });
  
    //  Typing Text Animation  //
  
    var typed = new Typed(".typing", {
      strings: [
        "Fullstack Developer",
        "Software Engineer",
        "NestJs Developer",
        "Backend Developer",
        "Electrical Engineer"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
  
    var typed = new Typed(".typing-2", {
      strings: [
        "Fullstack Developer",
        "Software Engineer",
        "NestJs Developer",
        "Backend Developer",
        "Electrical Engineer"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
  
    //  Owl Carousel  //
  
    $(".carousel").owlCarousel({
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeOut: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          nav: false
        }
      }
    });
  });