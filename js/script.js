/* ========================================
   INITIAL INVITATION STATE
======================================== */

document.body.classList.add(
    "invitation-locked"
);


/* ========================================
   OPENING TRANSITION
======================================== */

const openInvitationButton =
    document.getElementById(
        "open-invitation"
    );

const openingSection =
    document.getElementById(
        "opening"
    );

const coupleSection =
    document.getElementById(
        "couple"
    );


openInvitationButton.addEventListener(
    "click",
    () => {

        /* Enable normal scrolling */

        document.body.classList.remove(
            "invitation-locked"
        );

        document.body.classList.add(
            "invitation-open"
        );


        /* Start music after user interaction */

        if (
            typeof playMusic === "function"
        ) {

            playMusic();

        }


        /* Start opening animation */

        openingSection.classList.add(
            "opening-exit"
        );


        /*
         * After animation, completely
         * remove Opening from page flow.
         */

        setTimeout(() => {

            openingSection.classList.add(
                "opening-removed"
            );


            /* Move directly to Couple */

            coupleSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 700);

    }
);

/* ========================================
   LIVE COUNTDOWN
======================================== */

const countdownSection =
    document.getElementById(
        "countdown"
    );


const countdownDate =
    new Date(
        countdownSection.dataset.eventDate
    ).getTime();


const daysElement =
    document.getElementById(
        "days"
    );

const hoursElement =
    document.getElementById(
        "hours"
    );

const minutesElement =
    document.getElementById(
        "minutes"
    );

const secondsElement =
    document.getElementById(
        "seconds"
    );


/* ========================================
   COUNTDOWN VALUE ANIMATION
======================================== */

function updateCountdownValue(
    element,
    value
) {

    /*
     * Don't animate if the value
     * hasn't changed.
     */

    if (
        element.textContent === value
    ) {

        return;

    }


    /* Start fade-out */

    element.classList.add(
        "countdown-changing"
    );


    /*
     * Change value after
     * fade-out.
     */

    setTimeout(
        () => {

            element.textContent =
                value;

            element.classList.remove(
                "countdown-changing"
            );

        },
        250
    );

}


/* ========================================
   UPDATE COUNTDOWN
======================================== */

function updateCountdown() {

    const now =
        Date.now();


    const difference =
        countdownDate - now;


    /* ====================================
       EVENT HAS ARRIVED
    ==================================== */

    if (
        difference <= 0
    ) {

        updateCountdownValue(
            daysElement,
            "00"
        );

        updateCountdownValue(
            hoursElement,
            "00"
        );

        updateCountdownValue(
            minutesElement,
            "00"
        );

        updateCountdownValue(
            secondsElement,
            "00"
        );

        return;

    }


    /* ====================================
       CALCULATE REMAINING TIME
    ==================================== */

    const days =
        Math.floor(
            difference /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                difference /
                (
                    1000 *
                    60 *
                    60
                )
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (
                    1000 *
                    60
                )
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    /* ====================================
       UPDATE DISPLAY
    ==================================== */

    updateCountdownValue(
        daysElement,
        String(days).padStart(
            2,
            "0"
        )
    );


    updateCountdownValue(
        hoursElement,
        String(hours).padStart(
            2,
            "0"
        )
    );


    updateCountdownValue(
        minutesElement,
        String(minutes).padStart(
            2,
            "0"
        )
    );


    updateCountdownValue(
        secondsElement,
        String(seconds).padStart(
            2,
            "0"
        )
    );

}


/* ========================================
   START COUNTDOWN
======================================== */

updateCountdown();


/* ========================================
   UPDATE EVERY SECOND
======================================== */

const countdownTimer =
    setInterval(
        updateCountdown,
        1000
    );


/* ========================================
   GALLERY LIGHTBOX
======================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const galleryLightbox =
    document.getElementById(
        "gallery-lightbox"
    );


const galleryLightboxImage =
    document.getElementById(
        "gallery-lightbox-image"
    );


const galleryClose =
    document.getElementById(
        "gallery-close"
    );


/* ========================================
   OPEN LIGHTBOX
======================================== */

galleryItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                const imageSource =
                    item.dataset.gallery;


                galleryLightboxImage.src =
                    imageSource;


                galleryLightbox.classList.add(
                    "active"
                );


                galleryLightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* ========================================
   CLOSE LIGHTBOX
======================================== */

function closeGalleryLightbox() {

    galleryLightbox.classList.remove(
        "active"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* Close button */

galleryClose.addEventListener(
    "click",
    closeGalleryLightbox
);


/* Click outside image */

galleryLightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            galleryLightbox
        ) {

            closeGalleryLightbox();

        }

    }
);


/* ========================================
   ESC KEY
======================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            galleryLightbox.classList.contains(
                "active"
            )
        ) {

            closeGalleryLightbox();

        }

    }
);


/* ========================================
   CALENDAR SYSTEM
======================================== */


/* ========================================
   CALENDAR ELEMENT
======================================== */

const calendarButton =
    document.getElementById(
        "calendar-button"
    );


const calendarHelpModal =
    document.getElementById(
        "calendar-help-modal"
    );


const calendarHelpOverlay =
    document.getElementById(
        "calendar-help-overlay"
    );


const calendarHelpClose =
    document.getElementById(
        "calendar-help-close"
    );


const calendarHelpContinue =
    document.getElementById(
        "calendar-help-continue"
    );


/* ========================================
   EVENT DETAILS
======================================== */

const calendarEvent = {

    title:
        "Ajina & Swaroop — Engagement",

    description:
        "Engagement ceremony of Ajina & Swaroop.",

    location:
        "St. Mary's Forane Church, Thariode.",

    start:
        "20261114T113000",

    end:
        "20261114T123000"

};


/* ========================================
   OPEN HELP MODAL
======================================== */

function openCalendarHelp() {

    calendarHelpModal.classList.add(
        "active"
    );

    calendarHelpModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


/* ========================================
   CLOSE HELP MODAL
======================================== */

function closeCalendarHelp() {

    calendarHelpModal.classList.remove(
        "active"
    );

    calendarHelpModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* ========================================
   CREATE CALENDAR FILE
======================================== */

function createCalendarFile() {

    const calendarContent = [

        "BEGIN:VCALENDAR",

        "VERSION:2.0",

        "PRODID:-//Ajina & Swaroop//Engagement Invitation//EN",

        "CALSCALE:GREGORIAN",

        "METHOD:PUBLISH",

        "BEGIN:VEVENT",

        "UID:ajina-swaroop-engagement-20261114@engagement-invitation",

        "DTSTAMP:20260820T000000Z",

        `DTSTART:${calendarEvent.start}`,

        `DTEND:${calendarEvent.end}`,

        `SUMMARY:${calendarEvent.title}`,

        `DESCRIPTION:${calendarEvent.description}`,

        `LOCATION:${calendarEvent.location}`,

        "STATUS:CONFIRMED",

        "TRANSP:OPAQUE",

        "END:VEVENT",

        "END:VCALENDAR"

    ].join(
        "\r\n"
    );


    return new Blob(
        [calendarContent],
        {
            type:
                "text/calendar;charset=utf-8"
        }
    );
}


/* ========================================
   OPEN CALENDAR EVENT
======================================== */

function addToCalendar() {

    const calendarBlob =
        createCalendarFile();


    const calendarURL =
        URL.createObjectURL(
            calendarBlob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        calendarURL;


    link.download =
        "Ajina-Swaroop-Engagement.ics";


    link.style.display =
        "none";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    setTimeout(
        () => {

            URL.revokeObjectURL(
                calendarURL
            );

        },
        1000
    );


    closeCalendarHelp();
}


/* ========================================
   ADD TO CALENDAR
======================================== */

calendarButton.addEventListener(
    "click",
    openCalendarHelp
);


/* ========================================
   CONTINUE
======================================== */

calendarHelpContinue.addEventListener(
    "click",
    addToCalendar
);


/* ========================================
   CLOSE BUTTON
======================================== */

calendarHelpClose.addEventListener(
    "click",
    closeCalendarHelp
);


/* ========================================
   CLICK OUTSIDE
======================================== */

calendarHelpOverlay.addEventListener(
    "click",
    closeCalendarHelp
);


/* ========================================
   ESC KEY
======================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            calendarHelpModal.classList.contains(
                "active"
            )
        ) {

            closeCalendarHelp();

        }

    }
);

/* ========================================
   MUSIC PLAYER
======================================== */


/* ========================================
   MUSIC FILES
======================================== */

const musicTracks = [

    "music/ashot_danielyan-peaceful-romantic-violin-classical-cinematic-soundtrack-238618.mp3",

    "music/dream-protocol-focus-on-her-soft-acoustic-guitar-instrumental-22171.mp3",

    "music/good_b_music-a-gentle-breeze-189206.mp3"

];


/* ========================================
   MUSIC ELEMENTS
======================================== */

const audio =
    document.getElementById(
        "invitation-audio"
    );


const musicPlayer =
    document.getElementById(
        "music-player"
    );


const musicToggle =
    document.getElementById(
        "music-toggle"
    );


const playPauseButton =
    document.getElementById(
        "play-pause"
    );


const previousButton =
    document.getElementById(
        "previous-song"
    );


const nextButton =
    document.getElementById(
        "next-song"
    );


/* ========================================
   MUSIC STATE
======================================== */

let currentTrackIndex = 0;

let isPlaying = false;


/* ========================================
   LOAD TRACK
======================================== */

function loadTrack(
    index,
    shouldPlay = false
) {

    currentTrackIndex =
        (
            index +
            musicTracks.length
        ) %
        musicTracks.length;


    const track =
        musicTracks[
            currentTrackIndex
        ];


    audio.src = track;

    audio.load();


    /*
     * Play automatically only when
     * explicitly requested.
     */

    if (shouldPlay) {

        playMusic();

    }

}


/* ========================================
   PLAY MUSIC
======================================== */

function playMusic() {

    if (!audio.src) {

        loadTrack(
            currentTrackIndex,
            false
        );

    }


    const playPromise =
        audio.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(() => {

                isPlaying = true;

                updateMusicUI();

            })
            .catch((error) => {

                console.error(
                    "Music playback error:",
                    error
                );

                isPlaying = false;

                updateMusicUI();

            });

    }

}


/* ========================================
   PAUSE MUSIC
======================================== */

function pauseMusic() {

    audio.pause();

    isPlaying = false;

    updateMusicUI();

}


/* ========================================
   PLAY / PAUSE
======================================== */

function toggleMusic() {

    if (
        audio.paused
    ) {

        playMusic();

    } else {

        pauseMusic();

    }

}


/* ========================================
   NEXT SONG
======================================== */

function nextSong() {

    loadTrack(
        currentTrackIndex + 1,
        true
    );

}


/* ========================================
   PREVIOUS SONG
======================================== */

function previousSong() {

    loadTrack(
        currentTrackIndex - 1,
        true
    );

}


/* ========================================
   UPDATE PLAYER UI
======================================== */

function updateMusicUI() {

    if (
        !musicPlayer ||
        !playPauseButton
    ) {

        return;

    }


    if (
        isPlaying
    ) {

        musicPlayer.classList.add(
            "playing"
        );


        playPauseButton.textContent =
            "❚❚";


        playPauseButton.setAttribute(
            "aria-label",
            "Pause music"
        );

    } else {

        musicPlayer.classList.remove(
            "playing"
        );


        playPauseButton.textContent =
            "▶";


        playPauseButton.setAttribute(
            "aria-label",
            "Play music"
        );

    }

}


/* ========================================
   OPEN / CLOSE MUSIC CONTROLS
======================================== */

if (
    musicToggle &&
    musicPlayer
) {

    musicToggle.addEventListener(
        "click",
        () => {

            const isExpanded =
                musicPlayer.classList.toggle(
                    "expanded"
                );


            musicToggle.setAttribute(
                "aria-expanded",
                isExpanded
                    ? "true"
                    : "false"
            );


            musicToggle.setAttribute(
                "aria-label",
                isExpanded
                    ? "Close music controls"
                    : "Open music controls"
            );

        }
    );

}


/* ========================================
   PLAY / PAUSE BUTTON
======================================== */

if (
    playPauseButton
) {

    playPauseButton.addEventListener(
        "click",
        () => {

            toggleMusic();

        }
    );

}


/* ========================================
   NEXT BUTTON
======================================== */

if (
    nextButton
) {

    nextButton.addEventListener(
        "click",
        () => {

            nextSong();

        }
    );

}


/* ========================================
   PREVIOUS BUTTON
======================================== */

if (
    previousButton
) {

    previousButton.addEventListener(
        "click",
        () => {

            previousSong();

        }
    );

}


/* ========================================
   TRACK ENDED
======================================== */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* ========================================
   AUDIO ERROR
======================================== */

audio.addEventListener(
    "error",
    () => {

        console.error(
            "Unable to load music:",
            musicTracks[
                currentTrackIndex
            ]
        );


        isPlaying = false;

        updateMusicUI();

    }
);


/* ========================================
   AUDIO PLAY EVENT
======================================== */

audio.addEventListener(
    "play",
    () => {

        isPlaying = true;

        updateMusicUI();

    }
);


/* ========================================
   AUDIO PAUSE EVENT
======================================== */

audio.addEventListener(
    "pause",
    () => {

        isPlaying = false;

        updateMusicUI();

    }
);


/* ========================================
   INITIAL MUSIC
======================================== */

/*
 * Load the first song without
 * starting it automatically.
 *
 * The Opening button will start
 * the music after the visitor's
 * interaction, which avoids browser
 * autoplay restrictions.
 */

loadTrack(
    2,
    false
);


updateMusicUI();