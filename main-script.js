const Keyboard = {
  elements: {
    textarea: null,
    keyboard: null,
    keysbutton: [],
  },

  keys_sets: {
    keysInit: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Delete",
      "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ControlLeft", "MetaLeft", "AltLeft", "Space", "ArrowLeft", "ArrowDown", "ArrowRight"],
    keysEN2nd: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "Del",
      "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "up", "Ctrl", "Win", "Alt", "Space", "left", "down", "right"],
    keysEN: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Del",
      "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter", "lShift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "lCtrl", "Win", "lAlt", "Space", "left", "down", "right"],
    keysRU: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Del",
      "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", "Ctrl", "Win", "Alt", "Space", "left", "down", "right"],
    keysRU2nd: ["!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Del",
      "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up", "Ctrl", "Win", "Alt", "Space", "left", "down", "right"]
  },

  mode: {
    capslock: false,
    shift: false,
    ctrl: false,
    alt: false,
    active_keySet: "keysEN",
  },

  init() {
    this.elements.keyboard = document.createElement('div');
    this.elements.keyboard.classList.add("keyboard");
    this.elements.textarea = document.createElement('textarea');
    this.elements.help = document.createElement("div");
    this.elements.help.classList.add("help");
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keyboard);
    Keyboard.buttonsCreate();
    document.body.appendChild(this.elements.help);
    document.querySelector("div.help").innerHTML = "<p><i>ОС: Win; Переключение языка: Alt+Shift</i></p>";
  },

  buttonsCreate() {
    const createIconHtml = (icon_name) => {
      return "<i>" + icon_name + "</i>"
    };

    function input_text(key) {
      Keyboard.elements.textarea.focus();
      if (Keyboard.elements.textarea.selectionStart || Keyboard.elements.textarea.selectionStart == "0") {
        let start = Keyboard.elements.textarea.selectionStart;
        let end = Keyboard.elements.textarea.selectionEnd;
        Keyboard.elements.textarea.value = Keyboard.elements.textarea.value.substring(0, start) + key + Keyboard.elements.textarea.value.substring(end, Keyboard.elements.textarea.value.lengt);
        Keyboard.elements.textarea.setSelectionRange(start + 1, start + 1);
      }
    }

    function del_text() {
      if (Keyboard.elements.textarea.selectionStart || Keyboard.elements.textarea.selectionStart == "0") {
        let start = Keyboard.elements.textarea.selectionStart;
        let end = Keyboard.elements.textarea.selectionEnd;
        Keyboard.elements.textarea.value = Keyboard.elements.textarea.value.substring(0, start) + Keyboard.elements.textarea.value.substring(end + 1, Keyboard.elements.textarea.value.lengt);
        Keyboard.elements.textarea.setSelectionRange(start, start);
      }
    }

    function move_text(key) {
      let start = Keyboard.elements.textarea.selectionStart;
      let end = 0;
      let str_len = -1;
      let text_arr = [];
      let n = 0;
      let i = 0;
      if (Keyboard.elements.textarea.selectionStart || Keyboard.elements.textarea.selectionStart == "0") {
        switch (key) {
          case "left":
            Keyboard.elements.textarea.setSelectionRange(start - 1, start - 1);
            break;

          case "right":
            Keyboard.elements.textarea.setSelectionRange(start + 1, start + 1);
            break;

          case "up":
            start = Keyboard.elements.textarea.selectionStart;
            text_arr = Keyboard.elements.textarea.value.split("\n");
            if (text_arr.length > 1) {
              while (i < 1) {
                console.log(n);
                str_len = str_len + text_arr[n].length + 1;
                i = str_len / start;
                console.log(start + " " + str_len);
                n++;
              }
              if (n > 1) {
                if (text_arr[n - 1].length > text_arr[n - 2].length) {
                  end = str_len - 1 - text_arr[n - 1].length;
                } else {
                  end = start - text_arr[n - 2].length - 1;
                }

                console.log(start + " " + str_len + " " + end)
                Keyboard.elements.textarea.setSelectionRange(end, end);
              }
            }
            break;

          case "down":
            start = Keyboard.elements.textarea.selectionStart;
            text_arr = Keyboard.elements.textarea.value.split("\n");
            while (i < 1) {
              console.log(n);
              str_len = str_len + text_arr[n].length + 1;
              i = str_len / start;
              console.log(start + " " + str_len);
              n++;
            }
            if (n < text_arr.length) {
              if (text_arr[n - 1].length > text_arr[n].length) { end = str_len + text_arr[n].length + 1 } else {
                end = start + text_arr[n - 1].length + 1;
              }
              console.log(start + " " + str_len + " " + end)
              console.log("down");
              Keyboard.elements.textarea.setSelectionRange(end, end);
            }
            break;
        }
      }
    }

    function capslock_activation() {
      Keyboard.mode.capslock = !Keyboard.mode.capslock;
      if (Keyboard.mode.capslock) { document.querySelector("button[value = Caps]").classList.add("active"); } else {
        document.querySelector("button[value = Caps]").classList.remove("active");
      }
      for (let keybutton of Keyboard.elements.keysbutton) {
        if (keybutton.classList.contains("char_button")) {
          keybutton.value = Keyboard.mode.capslock ? keybutton.value.toUpperCase() : keybutton.value.toLowerCase();
          keybutton.textContent = keybutton.value;
        }
      }
    }

    function shift_activation() {
      Keyboard.mode.shift = !Keyboard.mode.shift;
      if (Keyboard.mode.shift) {
        document.querySelector("button[value=Shift]").classList.add("active");
      } else {
        document.querySelector("button[value=Shift]").classList.remove("active");
      }
    }

    function ctrl_activation() {
      Keyboard.mode.ctrl = !Keyboard.mode.ctrl;
      if (Keyboard.mode.ctrl) {
        document.querySelector("button[value=Ctrl]").classList.add("active");
      } else {
        document.querySelector("button[value=Ctrl]").classList.remove("active");
      }
    }

    function alt_activation() {
      Keyboard.mode.alt = !Keyboard.mode.alt;
      if (Keyboard.mode.alt) {
        document.querySelector("button[value=Alt]").classList.add("active");
      } else {
        document.querySelector("button[value=Alt]").classList.remove("active");
      }
    }

    function change_2nd() {
      switch (Keyboard.mode.active_keySet) {
        case "keysEN": Keyboard.mode.active_keySet = "keysEN2nd";
          break;

        case "keysEN2nd": Keyboard.mode.active_keySet = "keysEN";
          break;

        case "keysRU": Keyboard.mode.active_keySet = "keysRU2nd";
          break;

        case "keysRU2nd": Keyboard.mode.active_keySet = "keysRU";
          break;
      }
      for (let keybutton of Keyboard.elements.keysbutton) {
        if (keybutton.classList.contains("char_button")) {
          keybutton.value = Keyboard.keys_sets[Keyboard.mode.active_keySet][Keyboard.keys_sets.keysInit.indexOf(keybutton.name)];
          keybutton.textContent = keybutton.value;
        }
      }
    }

    function change_lang() {
      switch (Keyboard.mode.active_keySet) {
        case "keysEN": Keyboard.mode.active_keySet = "keysRU";
          break;

        case "keysEN2nd": Keyboard.mode.active_keySet = "keysRU";
          break;

        case "keysRU": Keyboard.mode.active_keySet = "keysEN";
          break;

        case "keysRU2nd": Keyboard.mode.active_keySet = "keysEN";
          break;
      }
      for (let keybutton of Keyboard.elements.keysbutton) {
        if (keybutton.classList.contains("char_button")) {
          keybutton.value = Keyboard.keys_sets[Keyboard.mode.active_keySet][Keyboard.keys_sets.keysInit.indexOf(keybutton.name)];
          keybutton.textContent = keybutton.value;
        }
      }
      if (Keyboard.mode.capslock) {
        for (let keybutton of Keyboard.elements.keysbutton) {
          if (keybutton.classList.contains("char_button")) {
            keybutton.value = Keyboard.mode.capslock ? keybutton.value.toUpperCase() : keybutton.value.toLowerCase();
            keybutton.textContent = keybutton.value;
          }
        }
      }
      localStorage.setItem("lang", Keyboard.mode.active_keySet);
    }

    function anim(item, mode) {
      function draw(progress) {
        switch (mode) {
          case "down":
            item.style.top = -animation_width * progress + "px";
            item.style.left = animation_width * progress + "px";
            item.style.boxShadow = (2 - 2 * progress) + "px " + (2 - 2 * progress) + "px #33191930";
            break;

          case "up":
            item.style.top = -animation_width + animation_width * progress + "px";
            item.style.left = animation_width - animation_width * progress + "px";
            item.style.boxShadow = 2 * progress + "px -" + 2 * progress + "px #33191930";
            break;
        }
      }
      let animation_velocity = 0.04;
      let animation_width = 2;
      let animation_time = animation_width / animation_velocity;
      let start = performance.now();
      let animation = requestAnimationFrame(function animate() {
        if (!item.name.includes("ShiftLeft") && !item.name.includes("ControlLeft") && !item.name.includes("AltLeft") && !item.name.includes("CapsLock")) {
          item.classList.add("active");
        }
        let time = (performance.now() - start) / animation_time;
        if (time >= 1) {
          cancelAnimationFrame(animation);
          if (!item.name.includes("ShiftLeft") && !item.name.includes("ControlLeft") && !item.name.includes("AltLeft") && !item.name.includes("CapsLock")) {
            item.classList.remove("active");
          }
          switch (mode) {
            case "down":
              item.style.top = -animation_width + "px";
              item.style.left = animation_width + "px";
              item.style.boxShadow = "0px 0px #33191930";
              break;

            case "up":
              item.style.top = 0 + "px";
              item.style.left = 0 + "px";
              item.style.boxShadow = "2px -2px #33191930";
              break;
          }
        } else {
          draw(time);
          requestAnimationFrame(animate);
        }

      })
    }

    this.keys_sets.keysEN.forEach(key => {
      const key_button = document.createElement('button');
      switch (key) {
        case "backspace":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 6vw"
          key_button.value = key;
          key_button.addEventListener("click", () => {
            this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
            document.querySelector("textarea").focus();
            anim(key_button, "down");
            anim(key_button, "up");
          });
          break;

        case "Tab":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 4vw"
          key_button.value = key;
          key_button.addEventListener("click", () => {
            this.elements.textarea.value += "    ";
            document.querySelector("textarea").focus();
            anim(key_button, "down");
            anim(key_button, "up");
          });
          break;

        case "Del":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 4vw"
          key_button.value = key;
          key_button.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            del_text();
            anim(key_button, "down");
            anim(key_button, "up");
          });
          break;

        case "Caps":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 6vw";
          key_button.value = key;
          key_button.addEventListener("click", () => {
            capslock_activation();
            anim(key_button, "down");
            anim(key_button, "up");
          });
          break;

        case "Enter":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 5vw";
          key_button.value = key;
          key_button.addEventListener('click', () => {
            document.querySelector("textarea").focus();
            this.elements.textarea.value += "\n";
            anim(key_button, "down");
            anim(key_button, "up");
          });
          break;

        case "lShift":
          key_button.innerHTML = createIconHtml(key.slice(1));
          key_button.style = "max-width: 7vw";
          key_button.value = key.slice(1);
          key_button.addEventListener("click", () => {
            if (this.mode.shift && this.mode.alt) {
              change_lang();
              shift_activation();
              alt_activation();
            } else {
              shift_activation();
              change_2nd();
            }
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "lCtrl":
          key_button.innerHTML = createIconHtml(key.slice(1));
          key_button.style = "max-width: 4vw";
          key_button.value = key.slice(1);
          key_button.addEventListener("click", () => {
            ctrl_activation();
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "lAlt":
          key_button.innerHTML = createIconHtml(key.slice(1));
          key_button.style = "max-width: 4vw";
          key_button.value = key.slice(1);
          key_button.addEventListener("click", () => {
            if (this.mode.shift && this.mode.alt) {
              change_lang();
              shift_activation();
            }
            alt_activation();
            document.querySelector("textarea").focus();
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "Space":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 25vw";
          key_button.value = key;
          key_button.addEventListener("click", () => {
            input_text(" ");
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "Win":
          key_button.innerHTML = createIconHtml(key);
          key_button.style = "max-width: 3vw";
          key_button.value = key;
          key_button.addEventListener("click", () => {
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "up":
          key_button.innerHTML = createIconHtml(String.fromCharCode(8593));
          key_button.value = key;
          key_button.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            move_text(key);
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;
        case "left":
          key_button.innerHTML = createIconHtml(String.fromCharCode(8592));
          key_button.value = key;
          key_button.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            move_text(key);
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "down":
          key_button.innerHTML = createIconHtml(String.fromCharCode(8595));
          key_button.value = key;
          key_button.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            move_text(key);
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        case "right":
          key_button.innerHTML = createIconHtml(String.fromCharCode(8594));
          key_button.value = key;
          key_button.addEventListener("click", () => {
            document.querySelector("textarea").focus();
            move_text(key);
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;

        default:
          key_button.classList.add("char_button");
          key_button.value = key;
          key_button.innerHTML = key_button.value;
          key_button.addEventListener("click", () => {
            input_text(key_button.value);
            anim(key_button, "down");
            anim(key_button, "up");
          })
          break;
      }

      switch (key) {
        case "lAlt":
          key_button.setAttribute("name", "AltLeft");
          break;

        case "lCtrl":
          key_button.setAttribute("name", "ControlLeft");
          break;

        case "lShift":
          key_button.setAttribute("name", "ShiftLeft");
          break;

        default:
          key_button.setAttribute("name", this.keys_sets.keysInit[this.keys_sets.keysEN.indexOf(key_button.value)]);
          break;
      }

      document.querySelector("div.keyboard").appendChild(key_button);
      if (["backspace", "Del", "Enter", "up"].includes(key)) {
        document.querySelector("div.keyboard").appendChild(document.createElement('br'));
      }
    });
    this.keys_sets.keysEN.splice(this.keys_sets.keysEN.indexOf("lShift"), 1, "Shift");
    this.elements.keysbutton = document.querySelectorAll('button');
    switch (localStorage.getItem("lang")) {
      case null: localStorage.setItem("lang", Keyboard.mode.active_keySet);
        break;

      case "keysRU":
        change_lang();
        break;
    }

    let caps_position = false;
    window.addEventListener('keydown', (event) => {
      if (this.keys_sets.keysInit.includes(event.code)) {
        console.log(event.code);
        event.preventDefault();
        let button_item = document.querySelector("button[name=" + event.code + "]");
        let click = new MouseEvent("click");
        switch (event.code) {
          case "CapsLock":
            if (!caps_position) {
              caps_position = !caps_position;
              capslock_activation();
              anim(button_item, "down");
            }
            break;

          case "ShiftLeft":
            if (!button_item.classList.contains('active')) {
              shift_activation();
              change_2nd();
              anim(button_item, "down");
            }
            break;

          case "AltLeft":
            if (!button_item.classList.contains('active')) {
              alt_activation();
              anim(button_item, "down");
            }
            break;

          case "ControlLeft":
            if (!button_item.classList.contains('active')) {
              ctrl_activation();
              anim(button_item, "down");
            }
            break;

          default:
            button_item.dispatchEvent(click);
            break;
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      if (this.keys_sets.keysInit.includes(event.code)) {
        event.preventDefault();
        let button_item = document.querySelector("button[name=" + event.code + "]");
        switch (event.code) {
          case "CapsLock":
            if (caps_position) {
              caps_position = !caps_position;
              anim(button_item, "up");
            }
            break;

          case "ShiftLeft":
            if (button_item.classList.contains('active')) {
              if (this.mode.shift && this.mode.alt) {
                change_lang();
                shift_activation();
              } else {
                shift_activation();
                change_2nd();
              }
              anim(button_item, "up");
            }
            break;

          case "AltLeft":
            if (button_item.classList.contains('active')) {
              alt_activation();
              anim(button_item, "up");
            }
            break;

          case "ControlLeft":
            if (button_item.classList.contains('active')) {
              ctrl_activation();
              anim(button_item, "up");
            }
            break;
        }
      }
    })
  },
}

Keyboard.init();
