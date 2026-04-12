$(document).ready(function () {

  let chats = [];
  let currentChatIndex = null;

  const responses = [
    "That's interesting!",
    "Tell me more.",
    "I can help with that.",
    "Here’s a simple answer.",
    "Nice question!",
  ];

  // 🧠 Create new chat
  function createNewChat() {
    const newChat = {
      id: Date.now(),
      messages: []
    };

    chats.push(newChat);
    currentChatIndex = chats.length - 1;

    renderChatHistory();
    renderMessages();

    $("#welcome").show();
  }

  // 🧾 Render chat history
  function renderChatHistory() {
    $(".chat-history").html("");

    chats.forEach((chat, index) => {
      $(".chat-history").append(`
        <div class="chat-item ${index === currentChatIndex ? "active" : ""}" data-index="${index}">
          Chat ${index + 1}
        </div>
      `);
    });
  }

  // 💬 Render messages
  function renderMessages() {
    $("#messages").html("");

    if (currentChatIndex === null) return;

    const chat = chats[currentChatIndex];

    if (chat.messages.length > 0) {
      $("#welcome").hide();
    }

    chat.messages.forEach(msg => {
      $("#messages").append(`
        <div class="message ${msg.type}">${msg.text}</div>
      `);
    });

    scrollToBottom();
  }

  // ➕ Add message
  function addMessage(text, type) {
    const chat = chats[currentChatIndex];

    chat.messages.push({ text, type });

    renderMessages();
  }

  // 🤖 Bot reply
  function botReply() {
    $("#typing").removeClass("d-none");

    setTimeout(() => {
      $("#typing").addClass("d-none");

      let reply = responses[Math.floor(Math.random() * responses.length)];
      addMessage(reply, "bot");

    }, 1200);
  }

  // 📩 Send message
  function sendMessage() {
    let text = $("#input").val().trim();

    if (text === "") return;

    addMessage(text, "user");
    $("#input").val("");

    $("#welcome").hide();

    botReply();
  }

  // 🔽 Scroll
  function scrollToBottom() {
    $(".chat-area").scrollTop($(".chat-area")[0].scrollHeight);
  }

  // 🎯 EVENTS

  // New Chat Button
  $(".new-chat").click(function () {
    createNewChat();
  });

  // Send Button
  $("#sendBtn").click(sendMessage);

  // Enter Key
  $("#input").keypress(function (e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Sidebar toggle (mobile)
  $("#menuBtn").click(function () {
    $("#sidebar").toggleClass("active");
  });

  // Click chat history
  $(document).on("click", ".chat-item", function () {
    currentChatIndex = $(this).data("index");
    renderChatHistory();
    renderMessages();
  });

  // Suggestion click
  $(".suggestion").click(function () {
    $("#input").val($(this).text());
    sendMessage();
  });

  // 🚀 INIT
  createNewChat();

});