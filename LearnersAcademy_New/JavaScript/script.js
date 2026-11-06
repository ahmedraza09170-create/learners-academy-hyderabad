/* 
   LEARNERS GUIDE CHATBOT
 */

let userName = localStorage.getItem("learnersGuideName") || "";

document.addEventListener("DOMContentLoaded", function () {

    const chatBtn = document.getElementById("chatBtn");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatContent = document.getElementById("chatContent");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const restartChat = document.getElementById("restartChat");


    /* 
       OPEN / CLOSE CHAT
     */

    if (chatBtn && chatBox) {

        chatBtn.addEventListener("click", function () {

            chatBox.classList.toggle("active");
            chatBtn.classList.toggle("active");

            if (chatBox.classList.contains("active")) {

                if (chatContent.children.length === 0) {
                    startChat();
                }

                setTimeout(function () {

                    chatInput?.focus();

                }, 200);

            }

        });

    }


    /* 
       CLOSE CHAT
     */

    closeChat?.addEventListener("click", function () {

        chatBox.classList.remove("active");
        chatBtn?.classList.remove("active");

    });


    /* 
       SEND BUTTON
     */

    sendChatBtn?.addEventListener("click", function () {

        sendUserMessage();

    });


    /* 
       ENTER KEY
     */

    chatInput?.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            sendUserMessage();

        }

    });


    /* 
       RESTART CHAT
     */

    restartChat?.addEventListener("click", function () {

        restartConversation();

    });

});


/* 
   START CHAT
 */

function startChat() {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    if (userName) {

        addBotMessage(
            `Welcome back, <b>${escapeHTML(userName)}</b>! 👋<br>
             How can I help you today?`
        );

        setTimeout(function () {

            showMainOptions();

        }, 500);

    } else {

        addBotMessage(
            `👋 Welcome to <b>Learners Academy</b>!<br><br>
             May I know your name please?`
        );

        setTimeout(function () {

            showNameInput();

        }, 300);

    }

}


/* 
   NAME INPUT
 */

function showNameInput() {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "chat-options name-input-box animate__animated animate__fadeIn";


    wrapper.innerHTML = `

        <div class="input-group shadow-sm">

            <input
                type="text"
                id="nameInput"
                class="form-control"
                placeholder="Enter your name..."
                autocomplete="off"
            >

            <button
                class="btn btn-primary"
                type="button"
                onclick="saveName()">

                Send

            </button>

        </div>

    `;

    chatContent.appendChild(wrapper);

    const input =
        document.getElementById("nameInput");

    input?.focus();

    scrollToBottom();


    input?.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            saveName();

        }

    });

}


/* 
   SAVE NAME
 */

window.saveName = function () {

    const input =
        document.getElementById("nameInput");

    if (!input) return;


    const name =
        input.value.trim();


    if (!name) {

        input.classList.add("is-invalid");

        input.focus();

        return;

    }


    userName = name;

    localStorage.setItem(
        "learnersGuideName",
        userName
    );


    document
        .querySelectorAll(".name-input-box")
        .forEach(el => el.remove());


    addUserMessage(
        `My name is ${escapeHTML(userName)}`
    );


    showTyping();


    setTimeout(function () {

        removeTyping();

        addBotMessage(
            `Nice to meet you, <b>${escapeHTML(userName)}</b>! 😊<br>
             How can I help you today?`
        );


        setTimeout(function () {

            showMainOptions();

        }, 400);

    }, 900);

};


/* 
   MAIN MENU
 */

function showMainOptions() {

    const options = [

        {
            text: "📚 Courses",
            action: "courses"
        },

        {
            text: "💰 Fees",
            action: "fees"
        },

        {
            text: "🎓 Admissions",
            action: "admissions"
        },

        {
            text: "📍 Location",
            action: "location"
        },

        {
            text: "📞 Contact",
            action: "contact"
        }

    ];


    renderOptions(options);

}


/* 
   COURSES MENU
 */

function showCourses() {

    addUserMessage("📚 Courses");

    showTyping();


    setTimeout(function () {

        removeTyping();

        addBotMessage(
            `We offer coaching programs for the following levels:`
        );


        renderOptions([

            {
                text: "IX & X - Matric",
                action: "matric"
            },

            {
                text: "XI & XII - Intermediate",
                action: "intermediate"
            },

            {
                text: "MDCAT",
                action: "mdcat"
            },

            {
                text: "ECAT",
                action: "ecat"
            },

            {
                text: "⬅️ Back",
                action: "back"
            }

        ]);

    }, 800);

}


/* 
   FEES MENU
 */

function showFees() {

    addUserMessage("💰 Fees");

    showTyping();


    setTimeout(function () {

        removeTyping();

        addBotMessage(
            `Sure! Which fee information would you like to know?`
        );


        renderOptions([

            {
                text: "Matric Fee",
                action: "matricFee"
            },

            {
                text: "Intermediate Fee",
                action: "interFee"
            },

            {
                text: "MDCAT Fee",
                action: "mdcatFee"
            },

            {
                text: "Fee Comparison",
                action: "feeComparison"
            },

            {
                text: "⬅️ Back",
                action: "back"
            }

        ]);

    }, 700);

}


/* 
   ADMISSIONS MENU
 */

function showAdmissions() {

    addUserMessage("🎓 Admissions");

    showTyping();


    setTimeout(function () {

        removeTyping();

        addBotMessage(
            `I can help you with admission-related information.`
        );


        renderOptions([

            {
                text: "🎓 Demo Class",
                action: "demo"
            },

            {
                text: "📚 Available Classes",
                action: "classes"
            },

            {
                text: "💸 Discounts",
                action: "discounts"
            },

            {
                text: "📞 Admission Contact",
                action: "contact"
            },

            {
                text: "⬅️ Back",
                action: "back"
            }

        ]);

    }, 700);

}


/* 
   HANDLE OPTION
 */

window.triggerOption = function (action) {

    handleOption(action);

};


function handleOption(action) {


    switch (action) {


        /* 
           MAIN
         */

        case "courses":

            showCourses();

            break;


        case "fees":

            showFees();

            break;


        case "admissions":

            showAdmissions();

            break;


        case "location":

            addUserMessage("📍 Location");

            showTyping();

            setTimeout(function () {

                removeTyping();

                addBotMessage(
                    `📍 We are located at:<br><br>
                    <b>Behind Lal Qila Restaurant</b><br>
                    Main Auto Bhan Road,<br>
                    Hyderabad, Sindh`
                );

                showBackOption();

            }, 700);

            break;


        case "contact":

            addUserMessage("📞 Contact");

            showTyping();

            setTimeout(function () {

                removeTyping();

                addBotMessage(
                    `📞 You can contact Learners Academy at:<br><br>
                    <b>(022) 3821282</b><br><br>
                    For admission and course information, please contact the academy.`
                );

                renderOptions([

                    {
                        text: "📞 Call Academy",
                        action: "call"
                    },

                    {
                        text: "⬅️ Back",
                        action: "back"
                    }

                ]);

            }, 700);

            break;


        /* 
           COURSES
         */

        case "matric":

            answer(
                "IX & X - Matric",
                `We offer professional coaching for <b>IX & X</b> students.`
            );

            break;


        case "intermediate":

            answer(
                "XI & XII - Intermediate",
                `We offer coaching for <b>XI & XII</b> students.`
            );

            break;


        case "mdcat":

            answer(
                "MDCAT",
                `We offer dedicated <b>MDCAT coaching</b> with lectures, FLPs and study materials.`
            );

            break;


        case "ecat":

            answer(
                "ECAT",
                `Yes, we offer dedicated <b>ECAT coaching</b> for engineering aspirants.`
            );

            break;


        /* 
           FEES
         */

        case "matricFee":

            answer(
                "Matric Fee",
                `The monthly fee for Matric <b>(IX & X)</b> is <b>Rs. 7500</b>.`
            );

            break;


        case "interFee":

            answer(
                "Intermediate Fee",
                `The monthly fee for Intermediate <b>(XI & XII)</b> is <b>Rs. 8500</b>.`
            );

            break;


        case "mdcatFee":

            answer(
                "MDCAT Fee",
                `The MDCAT full session fee is <b>Rs. 65000</b>.<br><br>
                This includes lectures, FLPs and study materials.`
            );

            break;


        case "feeComparison":

            answer(
                "Fee Comparison",

                `
                <div class="table-responsive">

                    <table class="table table-sm table-bordered mb-0">

                        <thead class="table-dark">

                            <tr>
                                <th>Level</th>
                                <th>Fee</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td>IX & X</td>
                                <td>Rs. 7500/mo</td>
                            </tr>

                            <tr>
                                <td>XI & XII</td>
                                <td>Rs. 8500/mo</td>
                            </tr>

                            <tr>
                                <td>MDCAT</td>
                                <td>Rs. 65000</td>
                            </tr>

                        </tbody>

                    </table>

                </div>
                `
            );

            break;


        /* =========================
           ADMISSIONS
        ========================= */

        case "demo":

            answer(
                "🎓 Demo Class",
                `You can visit the academy campus for a <b>free demo class</b>.<br><br>
                For further information, please contact the academy at <b>(022) 3821282</b>.`
            );

            break;


        case "classes":

            answer(
                "📚 Available Classes",
                `We currently offer coaching for:<br><br>
                • IX<br>
                • X<br>
                • XI<br>
                • XII<br>
                • MDCAT<br>
                • ECAT`
            );

            break;


        case "discounts":

            answer(
                "💸 Discounts",
                `We currently have an <b>Early Bird Discount</b> available for the first 50 registrations.<br><br>
                Former students may also be eligible for special loyalty discounts.`
            );

            break;


        /* 
           CALL
         */

        case "call":

            window.location.href =
                "tel:0223821282";

            break;


        /* 
           BACK
         */

        case "back":

            addUserMessage("⬅️ Back");

            setTimeout(function () {

                addBotMessage(
                    `Sure, <b>${escapeHTML(userName)}</b>. What would you like to know?`
                );

                showMainOptions();

            }, 300);

            break;

    }

}


/* 
   GENERIC ANSWER
 */

function answer(title, response) {

    addUserMessage(title);

    showTyping();


    setTimeout(function () {

        removeTyping();

        addBotMessage(response);

        showBackOption();

    }, 900);

}


/* 
   BACK BUTTON
 */

function showBackOption() {

    setTimeout(function () {

        renderOptions([

            {
                text: "⬅️ Back to Main Menu",
                action: "back"
            }

        ]);

    }, 300);

}


/* 
   RENDER OPTIONS
 */

function renderOptions(options) {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    document
        .querySelectorAll(".chat-options")
        .forEach(el => el.remove());


    const optionsDiv =
        document.createElement("div");

    optionsDiv.className =
        "chat-options mt-3 animate__animated animate__fadeIn";


    options.forEach(function (option) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "btn btn-outline-primary btn-sm text-start rounded-3";

        button.textContent =
            option.text;


        button.addEventListener("click", function () {

            document
                .querySelectorAll(".chat-options button")
                .forEach(btn => {

                    btn.disabled = true;

                });


            handleOption(option.action);

        });


        optionsDiv.appendChild(button);

    });


    chatContent.appendChild(optionsDiv);

    scrollToBottom();

}


/* 
   USER MESSAGE
 */

function addUserMessage(message) {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    const userMsg =
        document.createElement("div");

    userMsg.className =
        "user-msg animate__animated animate__fadeInRight";


    userMsg.innerHTML = `

        <span>
            ${message}
        </span>

    `;


    chatContent.appendChild(userMsg);

    scrollToBottom();

}


/* 
   BOT MESSAGE
 */

function addBotMessage(message) {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    const botMsg =
        document.createElement("div");

    botMsg.className =
        "bot-msg animate__animated animate__fadeInLeft";


    botMsg.innerHTML = `

        <div class="bot-message-content">

            <div class="bot-small-label">
                Learners Guide
            </div>

            <div>
                ${message}
            </div>

        </div>

    `;


    chatContent.appendChild(botMsg);

    scrollToBottom();

}


/* 
   TYPING INDICATOR
 */

function showTyping() {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    removeTyping();


    const typing =
        document.createElement("div");

    typing.id = "typingIndicator";

    typing.className =
        "bot-msg typing-message animate__animated animate__fadeIn";


    typing.innerHTML = `

        <span class="typing-label">
            Learners Guide is typing
        </span>

        <span class="typing-dots">

            <span></span>
            <span></span>
            <span></span>

        </span>

    `;


    chatContent.appendChild(typing);

    scrollToBottom();

}


/* 
   REMOVE TYPING
 */

function removeTyping() {

    const typing =
        document.getElementById("typingIndicator");

    typing?.remove();

}


/* 
   USER TEXT MESSAGE
 */

function sendUserMessage() {

    const input =
        document.getElementById("chatInput");

    if (!input) return;


    const message =
        input.value.trim();


    if (!message) return;


    addUserMessage(
        escapeHTML(message)
    );


    input.value = "";


    showTyping();


    setTimeout(function () {

        removeTyping();

        processUserQuestion(message);

    }, 900);

}


/* 
   SIMPLE FRONTEND QUESTION SYSTEM
 */

function processUserQuestion(message) {

    const text =
        message.toLowerCase();


    /* Fee questions */

    if (
        text.includes("matric") &&
        text.includes("fee")
    ) {

        answer(
            "Matric Fee",
            `The monthly fee for Matric <b>(IX & X)</b> is <b>Rs. 7,000</b>.`
        );

        return;

    }


    if (
        (text.includes("inter") ||
            text.includes("intermediate") ||
            text.includes("xi") ||
            text.includes("xii")) &&
        text.includes("fee")
    ) {

        answer(
            "Intermediate Fee",
            `The monthly fee for Intermediate <b>(XI & XII)</b> is <b>Rs. 8,000</b>.`
        );

        return;

    }


    if (
        text.includes("mdcat") &&
        text.includes("fee")
    ) {

        answer(
            "MDCAT Fee",
            `The MDCAT full session fee is <b>Rs. 60,000</b>, including lectures, FLPs and study materials.`
        );

        return;

    }


    /* Courses */

    if (
        text.includes("course") ||
        text.includes("classes") ||
        text.includes("class")
    ) {

        addBotMessage(
            `We offer coaching for <b>IX, X, XI, XII, MDCAT & ECAT</b>.`
        );

        showBackOption();

        return;

    }


    /* Location */

    if (
        text.includes("location") ||
        text.includes("address") ||
        text.includes("where")
    ) {

        addBotMessage(
            `📍 We are located at:<br><br>
            <b>Behind Lal Qila Restaurant</b><br>
            Main Auto Bhan Road,<br>
            Hyderabad, Sindh`
        );

        showBackOption();

        return;

    }


    /* Contact */

    if (
        text.includes("contact") ||
        text.includes("phone") ||
        text.includes("number") ||
        text.includes("call")
    ) {

        addBotMessage(
            `📞 You can contact Learners Academy at:<br><br>
            <b>(022) 3821282</b>`
        );

        renderOptions([

            {
                text: "📞 Call Academy",
                action: "call"
            },

            {
                text: "⬅️ Back",
                action: "back"
            }

        ]);

        return;

    }


    /* Demo */

    if (
        text.includes("demo") ||
        text.includes("register") ||
        text.includes("admission")
    ) {

        addBotMessage(
            `For a free demo class, please visit the academy campus.<br><br>
            You can also contact us at <b>(022) 3821282</b>.`
        );

        showBackOption();

        return;

    }


    /* MDCAT */

    if (text.includes("mdcat")) {

        addBotMessage(
            `Yes! We offer dedicated <b>MDCAT coaching</b> with lectures, FLPs and study materials.`
        );

        showBackOption();

        return;

    }


    /* ECAT */

    if (text.includes("ecat")) {

        addBotMessage(
            `Yes! We offer dedicated <b>ECAT coaching</b> for engineering aspirants.`
        );

        showBackOption();

        return;

    }


    /* Default */

    addBotMessage(
        `I'm here to help, <b>${escapeHTML(userName)}</b> 😊<br><br>
        You can ask me about courses, fees, admissions, MDCAT, ECAT, location or contact information.`
    );


    showMainOptions();

}


/* 
   RESTART CONVERSATION
 */

function restartConversation() {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    chatContent.innerHTML = "";


    userName = "";

    localStorage.removeItem(
        "learnersGuideName"
    );


    startChat();

}


/* 
   SCROLL
 */

function scrollToBottom() {

    const chatContent =
        document.getElementById("chatContent");

    if (!chatContent) return;


    setTimeout(function () {

        chatContent.scrollTop =
            chatContent.scrollHeight;

    }, 50);

}


/* 
   ESCAPE HTML
 */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}