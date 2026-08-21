/* ========================================
   CINEMATIC SCROLL TRANSITIONS
   CLEAN VERSION 1

   Scroll-position driven.

   No:
   - IntersectionObserver
   - scroll-visible
   - scrollIntoView
   - wheel interception
   - scroll snapping
======================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ====================================
           FIND INVITATION SECTIONS
        ==================================== */

        const sections =
            Array.from(
                document.querySelectorAll(
                    ".invitation-section"
                )
            );

        const excludedSections = new Set([
            "opening",
            "couple",
            "invitation-message"
        ]);


        if (!sections.length) {
            return;
        }


        /* ====================================
           FIND ANIMATABLE ELEMENTS
        ==================================== */

        const selector = [

            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",

            "p",

            "img",

            "button",

            "a",

            ".countdown-container",

            "figure",

            "blockquote",

            "svg",

            ".section-label",

            ".section-title",

            ".section-subtitle",

            ".couple-names",

            ".couple-divider",

            ".couple-date",

            ".countdown-number",

            ".countdown-label",

            ".countdown-unit",

            ".event-card",

            ".event-item",

            ".venue-address",

            ".venue-date",

            ".location-button",

            ".about-person",

            ".about-ampersand",

            ".photo-frame",

            ".photo-card",

            ".gallery-item",

            ".moment-card",

            ".special-card",

            ".invitation-card",

            ".ornament",

            ".decoration",

            ".divider"

        ].join(",");


        /* ====================================
           CREATE ELEMENT LIST
        ==================================== */

        const animatedElements = [];


        sections.forEach(
            (section) => {

                /*
                 * These sections stay completely
                 * clear and use their own design.
                 */

                if (
                    excludedSections.has(
                        section.id
                    )
                ) {
                    return;
                }


                const elements =
                    Array.from(
                        section.querySelectorAll(
                            selector
                        )
                    );


                elements.forEach(
                    (element) => {


                        /*
                         * Don't animate an element
                         * twice.
                         */

                        if (
                            element.classList.contains(
                                "scroll-element"
                            )
                        ) {
                            return;
                        }


                        /*
                         * Allow individual elements
                         * to opt out.
                         */

                        if (
                            element.dataset
                                .scrollAnimate ===
                            "false"
                        ) {
                            return;
                        }


                        /*
                         * If this element is already
                         * inside another animated
                         * element, don't animate both.
                         *
                         * Example:
                         *
                         * .gallery-item
                         *      └── img
                         *
                         * We animate the gallery item
                         * rather than making the image
                         * move independently inside it.
                         */

                        const animatedParent =
                            element.parentElement
                                ?.closest(
                                    ".scroll-element"
                                );


                        if (
                            animatedParent
                        ) {
                            return;
                        }


                        /* ==========================
                           ADD BASE CLASS
                        ========================== */

                        element.classList.add(
                            "scroll-element"
                        );


                        /* ==========================
                           TYPE
                        ========================== */

                        if (
                            element.tagName ===
                            "IMG" ||
                            element.matches(
                                ".photo-frame, .photo-card"
                            )
                        ) {

                            element.classList.add(
                                "scroll-image"
                            );

                        }


                        if (
                            /^H[1-6]$/.test(
                                element.tagName
                            )
                        ) {

                            element.classList.add(
                                "scroll-heading"
                            );

                        }


                        if (
                            element.tagName ===
                            "BUTTON" ||
                            element.matches(
                                ".location-button"
                            )
                        ) {

                            element.classList.add(
                                "scroll-button"
                            );

                        }


                        if (
                            element.matches(
                                "svg, .ornament, .decoration, .divider, .couple-divider"
                            )
                        ) {

                            element.classList.add(
                                "scroll-decoration"
                            );

                        }


                        /* ==========================
                           SAVE
                        ========================== */

                        animatedElements.push(
                            element
                        );

                    }
                );

            }
        );


        /* ====================================
           ANIMATION SETTINGS
        ==================================== */

        /*
         * Where the animation begins.
         *
         * 1.0 = bottom of viewport
         */

        const ENTER_START =
            0.92;


        /*
         * Where the element becomes fully
         * visible.
         */

        const ENTER_END =
            0.48;


        /*
         * Where an element begins leaving
         * the top of the viewport.
         */

        const EXIT_START =
            0.12;


        /*
         * Where it becomes mostly hidden
         * above the viewport.
         */

        const EXIT_END =
            -0.12;


        /* ====================================
           CLAMP
        ==================================== */

        function clamp(
            value,
            min,
            max
        ) {

            return Math.min(
                Math.max(
                    value,
                    min
                ),
                max
            );

        }


        /* ====================================
           SMOOTH CURVE
        ==================================== */

        function smoothstep(
            value
        ) {

            return (
                value *
                value *
                (
                    3 -
                    2 *
                    value
                )
            );

        }


        /* ====================================
           ENTER PROGRESS
        ==================================== */

        function calculateEnterProgress(
            center,
            viewportHeight
        ) {

            const start =
                viewportHeight *
                ENTER_START;


            const end =
                viewportHeight *
                ENTER_END;


            const progress =
                (
                    start -
                    center
                ) /
                (
                    start -
                    end
                );


            return smoothstep(
                clamp(
                    progress,
                    0,
                    1
                )
            );

        }


        /* ====================================
           EXIT PROGRESS
        ==================================== */

        function calculateExitProgress(
            center,
            viewportHeight
        ) {

            const start =
                viewportHeight *
                EXIT_START;


            const end =
                viewportHeight *
                EXIT_END;


            const progress =
                (
                    start -
                    center
                ) /
                (
                    start -
                    end
                );


            return smoothstep(
                clamp(
                    progress,
                    0,
                    1
                )
            );

        }


        /* ====================================
           UPDATE ONE ELEMENT
        ==================================== */

        function updateElement(
            element,
            viewportHeight
        ) {

            const rect =
                element.getBoundingClientRect();


            const center =
                rect.top +
                rect.height / 2;


            /* ==================================
               ELEMENT ENTERING FROM BELOW
            ================================== */

            const enterProgress =
                calculateEnterProgress(
                    center,
                    viewportHeight
                );


            /* ==================================
               ELEMENT LEAVING ABOVE
            ================================== */

            const exitProgress =
                calculateExitProgress(
                    center,
                    viewportHeight
                );


            /*
             * Decide whether the element is
             * entering or leaving.
             */

            let progress;


            if (
                center >=
                viewportHeight *
                ENTER_END
            ) {

                progress =
                    enterProgress;

            } else {

                progress =
                    1 -
                    exitProgress;

            }


            progress =
                clamp(
                    progress,
                    0,
                    1
                );


            /* ==================================
               ELEMENT TYPE
            ================================== */

            const isImage =
                element.classList.contains(
                    "scroll-image"
                );


            const isHeading =
                element.classList.contains(
                    "scroll-heading"
                );


            const isButton =
                element.classList.contains(
                    "scroll-button"
                );


            const isDecoration =
                element.classList.contains(
                    "scroll-decoration"
                );

            const isCountdown =
                element.classList.contains(
                    "countdown-container"
                );


            /* ==================================
               MOVEMENT
            ================================== */

            let startY =
                34;


            if (isCountdown) {

                startY = 45;

            }

            if (isImage) {

                startY =
                    55;

            } else if (isHeading) {

                startY =
                    42;

            } else if (isButton) {

                startY =
                    28;

            } else if (isDecoration) {

                startY =
                    20;

            }


            /*
             * Small upward movement when
             * leaving the viewport.
             */

            let translateY =
                startY *
                (1 - progress);


            if (
                center <
                viewportHeight *
                ENTER_END
            ) {

                const leaving =
                    exitProgress;


                translateY =
                    -18 *
                    leaving;

            }


            /* ==================================
               SCALE
            ================================== */

            let startScale =
                0.985;


            if (isImage) {

                startScale =
                    0.96;

            } else if (isHeading) {

                startScale =
                    0.975;

            } else if (isButton) {

                startScale =
                    0.98;

            } else if (isDecoration) {

                startScale =
                    0.95;

            }


            let scale =
                startScale +
                (
                    1 -
                    startScale
                ) *
                progress;


            /*
             * Very subtle scale-down
             * while leaving.
             */

            if (
                center <
                viewportHeight *
                ENTER_END
            ) {

                scale =
                    1 -
                    (
                        0.015 *
                        exitProgress
                    );

            }


            /* ==================================
               BLUR
            ================================== */

            let maxBlur =
                5;


            if (isCountdown) {

                maxBlur = 6;

            }


            if (isImage) {

                maxBlur =
                    8;

            } else if (isHeading) {

                maxBlur =
                    5.5;

            }


            let blur =
                maxBlur *
                (1 - progress);


            /*
             * Keep outgoing content almost
             * sharp instead of making it
             * suddenly disappear.
             */

            if (
                center <
                viewportHeight *
                ENTER_END
            ) {

                blur =
                    1.5 *
                    exitProgress;

            }


            /* ==================================
               OPACITY
            ================================== */

            let opacity =
                0.12 +
                (
                    0.88 *
                    progress
                );


            /*
             * Outgoing content remains visible
             * while moving away.
             */

            if (
                center <
                viewportHeight *
                ENTER_END
            ) {

                opacity =
                    1 -
                    (
                        0.35 *
                        exitProgress
                    );

            }


            /* ==================================
               APPLY
            ================================== */

            element.style.setProperty(
                "--scroll-opacity",
                opacity
            );


            element.style.setProperty(
                "--scroll-y",
                `${translateY}px`
            );


            element.style.setProperty(
                "--scroll-scale",
                scale
            );


            element.style.setProperty(
                "--scroll-blur",
                `${blur}px`
            );

        }


        /* ====================================
           UPDATE EVERYTHING
        ==================================== */

        function update() {

            const viewportHeight =
                window.innerHeight;


            animatedElements.forEach(
                (element) => {

                    updateElement(
                        element,
                        viewportHeight
                    );

                }
            );

        }


        /* ====================================
           REQUEST ANIMATION FRAME
        ==================================== */

        let ticking =
            false;


        function requestUpdate() {

            if (
                ticking
            ) {
                return;
            }


            ticking =
                true;


            requestAnimationFrame(
                () => {

                    update();

                    ticking =
                        false;

                }
            );

        }


        /* ====================================
           SCROLL
        ==================================== */

        window.addEventListener(
            "scroll",
            requestUpdate,
            {
                passive: true
            }
        );


        /* ====================================
           RESIZE
        ==================================== */

        window.addEventListener(
            "resize",
            requestUpdate
        );


        /* ====================================
           FIRST FRAME
        ==================================== */

        update();

    }
);

/* ========================================
   ELEMENT LEVEL ANIMATION
======================================== */

const animatedElements = document.querySelectorAll(
    `
    .invitation-section h1,
    .invitation-section h2,
    .invitation-section h3,
    .invitation-section p,
    .invitation-section .section-label,
    .invitation-section img,
    .invitation-section .photo-frame,
    .invitation-section .countdown-item,
    .invitation-section .event-card,
    .invitation-section .calendar-wrapper,
    .invitation-section .location-button,
    .invitation-section .person-name,
    .invitation-section .person-role,
    .invitation-section .person-family,
    .invitation-section .about-photo,
    .invitation-section .about-details
    `
);

const elementObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "element-visible"
                );

            } else {

                entry.target.classList.remove(
                    "element-visible"
                );

            }

        });

    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px"
    }
);


animatedElements.forEach((element) => {

    element.classList.add(
        "element-animate"
    );

    elementObserver.observe(element);

});