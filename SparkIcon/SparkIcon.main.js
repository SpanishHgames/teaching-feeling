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
*/

/* ENGLISH */

/*
  Note: This code is a snippet and does not represent the complete implementation of the mod/extension for Teaching Feeling.
  To integrate this snippet, you need to insert it into a specific JavaScript file within the Teaching Feeling project.
  Be sure to follow the project's instructions to locate the correct place to paste this code.
*/

hideNextImg: function () {
    $(".img_next").remove();
    $(".glyph_image").hide();
  },
  
  showNextImg: function () {
    if (this.kag.stat.flag_glyph === "false") {
      $(".img_next").remove();
      const messageLayer = this.kag.getMessageInnerLayer();
  
      // Add a container to facilitate animation and styling
      const nextContainer = $("<span class='img_next_container'></span>");
      messageLayer.find("p").append(nextContainer);
  
      // List of random icons
      const icons = ["▼", "►", "❖", "◆", "➤", "★"];
  
      // List of random animations
      const animations = [
        { name: "pulse", duration: "1.2s" },
        { name: "shake", duration: "0.8s" },
        { name: "bounce", duration: "1.8s" },
      ];
  
      // Select a random icon and animation
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
  
      // Add animated symbol
      const nextSymbol = $("<span class='img_next'>" + randomIcon + "</span>").appendTo(nextContainer);
  
      // Apply CSS styles and animations
      nextSymbol.css({
        "font-size": "18px",         // Symbol size
        "color": "#9b9b9b",          // Striking blue color
        "margin-left": "6px",        // Space between text and symbol
        "animation": `${randomAnimation.name} ${randomAnimation.duration} infinite`, // Random animation
        "position": "relative",
        "top": "4px"                 // Alignment with text
      });
  
      // Define CSS animations directly from JavaScript
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
    } else {
      $(".glyph_image").show();
    }
  },
