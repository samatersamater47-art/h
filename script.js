
        (function() {
            // ------ floating hearts background -----
            const bgContainer = document.getElementById('heartBg');
            const symbols = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '💗', '💓', '💕', '💖', '💘', '🌸', '🌺', '🌹'];
            for (let i = 0; i < 28; i++) {
                const span = document.createElement('span');
                span.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                span.style.left = Math.random() * 100 + '%';
                span.style.top = Math.random() * 100 + '%';
                span.style.animationDelay = (Math.random() * 6) + 's';
                span.style.fontSize = (1.5 + Math.random() * 2.5) + 'rem';
                span.style.opacity = 0.3 + Math.random() * 0.6;
                bgContainer.appendChild(span);
            }

            // ------- DOM elements -------
            const yesBtn = document.getElementById('yesBtn');
            const noBtn = document.getElementById('noBtn');
            const mainCard = document.getElementById('mainCard');
            const mainImage = document.getElementById('mainImage');
            const mainMessage = document.getElementById('mainMessage');
            const loveMsgDiv = document.getElementById('loveMessage');
            const btnContainer = document.getElementById('btnContainer');
            const imageArea = document.getElementById('imageArea');

            // ------- state -------
            let yesClicked = false;
            let noClickCount = 0;   // count how many times she tries to click no (for variety)

            // ------- FUN IMAGES + WORDS for NO attempts (above message) -------
            const noImages = [
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23fdd0d9\' /%3E%3Ctext x=\'28\' y=\'70\' font-size=\'50\' fill=\'%23b33b5e\'%3E😢%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23fec1cf\' /%3E%3Ctext x=\'25\' y=\'70\' font-size=\'55\' fill=\'%239e314f\'%3E😭%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffb3c6\' /%3E%3Ctext x=\'20\' y=\'70\' font-size=\'60\' fill=\'%23a13858\'%3E😤%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23faaac0\' /%3E%3Ctext x=\'22\' y=\'70\' font-size=\'58\' fill=\'%238f2b48\'%3E😖%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffb7c9\' /%3E%3Ctext x=\'22\' y=\'65\' font-size=\'50\' fill=\'%23b83b60\'%3E🥺%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23fec4d3\' /%3E%3Ctext x=\'22\' y=\'70\' font-size=\'55\' fill=\'%23a72e53\'%3E😫%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23fdb2c8\' /%3E%3Ctext x=\'26\' y=\'70\' font-size=\'52\' fill=\'%239e2f4f\'%3E😩%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23faa5bc\' /%3E%3Ctext x=\'25\' y=\'70\' font-size=\'50\' fill=\'%239f294b\'%3E🤨%3C/text%3E%3C/svg%3E'
            ];

            const noMessages = [
                'oh no bubu! 😢', 
                'bubu, why? 💔', 
                'not funny bubu 😭', 
                'stooop 🥺', 
                'bubu please 🥹', 
                'you break my heart 💔', 
                'bubu 🥺👉👈', 
                'try again beautiful 🌸',
                'bubu, that hurts 😫',
                'nuuu uh uh! 😤',
                'bubu, click yes 🌹'
            ];

            // ------- YES images & messages -------
            const yesImage = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffb3ca\' /%3E%3Ctext x=\'18\' y=\'70\' font-size=\'60\' fill=\'%23ba3d64\'%3E😍%3C/text%3E%3C/svg%3E';
            const yesMessage = 'yay! bubu said YES! 💖';

            // ------- make no button move (runaway) -------
            function moveNoButton() {
                if (yesClicked) return;

                const containerRect = btnContainer.getBoundingClientRect();
                const noRect = noBtn.getBoundingClientRect();

                const maxX = containerRect.width - noRect.width;
                const maxY = containerRect.height - noRect.height;

                let newX = Math.random() * maxX;
                let newY = Math.random() * maxY;

                // clamp
                newX = Math.min(maxX, Math.max(0, newX));
                newY = Math.min(maxY, Math.max(0, newY));

                noBtn.style.left = newX + 'px';
                noBtn.style.top = newY + 'px';
                noBtn.style.transform = `rotate(${Math.random()*6-3}deg)`;
                setTimeout(() => {
                    if (!yesClicked) noBtn.style.transform = 'rotate(0deg)';
                }, 150);
            }

            // set absolute positioning for noBtn
            noBtn.style.position = 'absolute';
            noBtn.style.left = '60%';
            noBtn.style.top = '10px';
            btnContainer.style.position = 'relative';
            btnContainer.style.display = 'flex';
            btnContainer.style.flexWrap = 'wrap';

            // ----- update image & message for NO attempts (different each time) -----
            function updateNoContent() {
                if (yesClicked) return;

                noClickCount++;
                // random index based on count to keep variety, but ensure it changes
                const imgIndex = (noClickCount * 3) % noImages.length;
                const msgIndex = (noClickCount * 7) % noMessages.length;

                mainImage.src = noImages[imgIndex];
                mainMessage.textContent = noMessages[msgIndex];

                // optional: change no button text for fun
                const naughtyTexts = ['💔', 'nope', '😈', 'miss', 'noo', 'bubu!', 'uh-uh', 'never?'];
                noBtn.textContent = naughtyTexts[Math.floor(Math.random() * naughtyTexts.length)];

                // tiny image bounce
                mainImage.style.transform = 'scale(0.9)';
                setTimeout(() => mainImage.style.transform = 'scale(1)', 150);
            }

            // ----- handle no interaction (mouse, click, touch) -----
            function handleNoEvent(e) {
                e.preventDefault();
                e.stopPropagation();
                if (yesClicked) return;

                moveNoButton();
                updateNoContent();

                // extra spark: make image area flash
                imageArea.style.backgroundColor = '#ffd9e4';
                setTimeout(() => imageArea.style.backgroundColor = '', 200);
            }

            // attach listeners
            noBtn.addEventListener('mouseenter', handleNoEvent);
            noBtn.addEventListener('click', handleNoEvent);
            noBtn.addEventListener('touchstart', handleNoEvent, { passive: false });
            // also move on focus (keyboard)
            noBtn.addEventListener('focus', (e) => {
                if (!yesClicked) moveNoButton();
            });

            // ------- YES BUTTON -------
            yesBtn.addEventListener('click', function(e) {
                if (yesClicked) return;

                yesClicked = true;

                // change image to happy yes image
                mainImage.src = yesImage;

                // change main message
                mainMessage.textContent = yesMessage;

                // hide no button
                noBtn.style.opacity = '0';
                noBtn.style.pointerEvents = 'none';
                noBtn.style.transition = 'opacity 0.4s';

                // add celebrate class to card (shows hidden love msg)
                mainCard.classList.add('celebrate');

                // change yes button text
                yesBtn.textContent = 'YES!! 💞';

                // launch heart confetti
                createHeartConfetti();

                // update image area bg
                imageArea.style.backgroundColor = '#fee0e9';
            });

            // ----- confetti effect (extra attractive) -----
            function createHeartConfetti() {
                for (let i = 0; i < 50; i++) {
                    const heart = document.createElement('div');
                    heart.innerHTML = ['💖', '💗', '💓', '💕', '💘', '🌸', '🌹', '💞', '🥰'][Math.floor(Math.random() * 9)];
                    heart.style.position = 'fixed';
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.top = '-10%';
                    heart.style.fontSize = (1.5 + Math.random() * 3) + 'rem';
                    heart.style.zIndex = '9999';
                    heart.style.pointerEvents = 'none';
                    heart.style.opacity = 0.8;
                    heart.style.animation = `fall ${4 + Math.random() * 4}s linear forwards`;
                    document.body.appendChild(heart);

                    setTimeout(() => heart.remove(), 8000);
                }
            }

            // add falling animation
            const styleSheet = document.createElement("style");
            styleSheet.textContent = `
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);

            // ensure no button inside container after resize
            window.addEventListener('resize', function() {
                if (!yesClicked) {
                    const containerRect = btnContainer.getBoundingClientRect();
                    const noRect = noBtn.getBoundingClientRect();
                    let left = parseFloat(noBtn.style.left) || 0;
                    let top = parseFloat(noBtn.style.top) || 0;
                    const maxX = containerRect.width - noRect.width;
                    const maxY = containerRect.height - noRect.height;
                    if (left > maxX) noBtn.style.left = Math.max(0, maxX-5) + 'px';
                    if (top > maxY) noBtn.style.top = Math.max(0, maxY-5) + 'px';
                }
            });

            // set initial random no message / image (optional)
            setTimeout(() => {
                if (!yesClicked) {
                    // just set a random cute no start, but keep original question?
                    // we keep original but we can preload some cheer
                }
            }, 100);
        })();
  