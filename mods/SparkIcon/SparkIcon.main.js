/*!
 *  SparkIcon v1.0
 *  SpanishHgames
 *
 *  (c) 2024, SpanishHgames Mods
 *  https://spanishhgames.netlify.app/
 *
 *  MIT License
 */  

/* SPANISH */

/*
  Nota: Este código es un fragmento y no representa la implementación completa del mod/extensión para Teaching Feeling.
  Para integrar este fragmento, debes insertarlo en un archivo JavaScript específico dentro del proyecto de Teaching Feeling.
  Asegúrate de seguir las instrucciones del proyecto para encontrar el lugar correcto donde pegar este código.

  carpeta-del-juego\resources\app\tyrano\plugins\kag\kag.tag.js - Funcion hideNextImg
*/

/* ENGLISH */

/*
  Note: This code is a snippet and does not represent the complete implementation of the mod/extension for Teaching Feeling.
  To integrate this snippet, you need to insert it into a specific JavaScript file within the Teaching Feeling project.
  Be sure to follow the project's instructions to locate the correct place to paste this code.

  game-folder\resources\app\tyrano\plugins\kag\kag.tag.js - hideNextImg function
*/

  // if you see this, it's because SparkIcon is implemented
  hideNextImg: function () {
    $(".img_next").remove();
    $(".glyph_image").hide();
  },
  
    showNextImg: function () {
      if (!window.config) {
          window.config = {
              useRandomAnimations: true,
              useRandomIcons: true,
              customIcon: null,
              useOriginalGif: false,
          };
      }
      
      if (!document.getElementById('configMenu')) {
          const configMenu = document.createElement('div');
          configMenu.id = 'configMenu';
          configMenu.innerHTML = `
              <h2>Configuración</h2>
              <label><input type="checkbox" id="useOriginalGif"> Usar GIF Original</label><br>
              <label><input type="checkbox" id="useRandomAnimations"> Animaciones Aleatorias</label><br>
              <label><input type="checkbox" id="useRandomIcons"> Iconos Aleatorios</label><br>
              <label>Icono Personalizado: <input type="text" id="customIcon" placeholder="Por defecto es ▼"></label><br>
              <button id="applyConfigBtn">Aplicar Configuración</button>
              <button id="closeConfigBtn">Cerrar</button>
          `;
          configMenu.style.position = 'fixed';
          configMenu.style.top = '10px';
          configMenu.style.right = '10px';
          configMenu.style.backgroundColor = '#fff';
          configMenu.style.border = '1px solid #ccc';
          configMenu.style.padding = '10px';
          configMenu.style.zIndex = '1000';
          configMenu.classList.add('hidden');
          document.body.appendChild(configMenu);

          const openConfigBtn = document.createElement('button');
          openConfigBtn.id = 'openConfigBtn';
          openConfigBtn.textContent = 'Abrir Configuración';
          document.body.appendChild(openConfigBtn);

          openConfigBtn.addEventListener('click', () => {
              configMenu.classList.toggle('hidden');
          });

          document.getElementById('closeConfigBtn').addEventListener('click', () => {
              configMenu.classList.add('hidden');
          });

          document.getElementById('applyConfigBtn').addEventListener('click', () => {
              window.config.useOriginalGif = document.getElementById('useOriginalGif').checked;
              window.config.useRandomAnimations = document.getElementById('useRandomAnimations').checked;
              window.config.useRandomIcons = document.getElementById('useRandomIcons').checked;
              window.config.customIcon = document.getElementById('customIcon').value || null;

              localStorage.setItem('config', JSON.stringify(window.config));
              
              configMenu.classList.add('hidden');
          });
      }

      document.addEventListener('keydown', (event) => {
          if (event.ctrlKey && event.shiftKey && event.key === 'C') {
              const configMenu = document.getElementById('configMenu');
              if (configMenu) {
                  configMenu.classList.toggle('hidden');
              }
          }
      });

      const savedConfig = localStorage.getItem('config');
      if (savedConfig) {
          window.config = JSON.parse(savedConfig);
      }

      const config = window.config;

      if (this.kag.stat.flag_glyph === "false") {
          $(".img_next").remove();
          const messageLayer = this.kag.getMessageInnerLayer();

          if (config.useOriginalGif) {
              const originalGif = $("<img class='img_next' src='./tyrano/images/system/nextpage.gif'>");
              messageLayer.find("p").append(originalGif);
          } else {
              const nextContainer = $("<span class='img_next_container'></span>");
              messageLayer.find("p").append(nextContainer);

              const icons = config.useRandomIcons 
                  ? ["▼", "►", "❖", "◆", "➤", "★"] 
                  : [config.customIcon || "▼"];
              const animations = config.useRandomAnimations 
                  ? [
                      { name: "pulse", duration: "1.2s" },
                      { name: "shake", duration: "0.8s" },
                      { name: "bounce", duration: "1.8s" },
                    ] 
                  : [{ name: "none", duration: "0s" }];

              const randomIcon = icons[Math.floor(Math.random() * icons.length)];
              const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

              const nextSymbol = $("<span class='img_next'>" + randomIcon + "</span>").appendTo(nextContainer);

              nextSymbol.css({
                  "font-size": "18px",
                  "color": "#9b9b9b",
                  "margin-left": "6px",
                  "animation": `${randomAnimation.name} ${randomAnimation.duration} infinite`,
                  "position": "relative",
                  "top": "4px"
              });

              $("<style>")
                  .prop("type", "text/css")
                  .html(`
                    @keyframes pulse {
                      0%, 100% {
                        transform: scale(1);
                      }
                      50% {
                        transform: scale(1.2);
                      }
                    }
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      25%, 75% { transform: translateX(-3px); }
                      50% { transform: translateX(3px); }
                    }
                    @keyframes bounce {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-5px); }
                    }
                    .img_next_container {
                      display: inline-block;
                      animation: ${randomAnimation.name} ${randomAnimation.duration} infinite;
                    }
                  `)
                  .appendTo("head");
          }
      } else {
          $(".glyph_image").show();
      }
  },
