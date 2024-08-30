import React from 'react';
import { Link } from 'react-router-dom';

export const LogoGymtrack = ({ logoSize = 'medium' }) => {
    // Para poner diferentes medidas y no tener que editar las clases 1x1
    const sizeMap = {
        small: {
            svgSize: 'size-10',
            textSize: 'text-sm',
        },
        medium: {
            svgSize: 'size-16',
            textSize: 'text-xl',
        },
        large: {
            svgSize: 'size-20',
            textSize: 'text-4xl',
        },
    };

    const { svgSize, textSize } = sizeMap[logoSize] || sizeMap['medium'];

    return (
        <Link className='flex items-center' to={"/"}>
            <svg className={`${svgSize}  invert`} version="1.0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000.000000 1000.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M4497 9584 c-3 -4 -23 -10 -44 -15 -33 -7 -96 -23 -128 -33 -54 -17
        -177 -77 -195 -96 -3 -3 -18 -14 -35 -24 -144 -92 -280 -275 -329 -441 -10
        -33 -22 -69 -26 -80 -5 -11 -14 -62 -21 -113 -9 -73 -9 -109 0 -165 6 -40 17
        -101 22 -137 6 -36 17 -84 25 -107 15 -46 78 -174 117 -237 17 -27 23 -51 22
        -80 -3 -47 -20 -150 -35 -216 -6 -25 -15 -67 -21 -95 -9 -45 -31 -125 -61
        -225 -17 -59 -33 -74 -119 -119 -109 -57 -136 -72 -212 -121 -35 -22 -67 -40
        -72 -40 -4 0 -19 -8 -33 -19 -24 -16 -57 -35 -152 -88 -14 -8 -43 -25 -65 -39
        -22 -13 -47 -27 -55 -31 -8 -4 -31 -16 -50 -28 -19 -12 -66 -39 -105 -60 -38
        -21 -88 -48 -111 -60 -22 -13 -61 -25 -85 -28 -24 -2 -96 -10 -159 -16 -126
        -13 -196 -33 -310 -88 -156 -76 -201 -110 -288 -218 -31 -38 -60 -72 -64 -75
        -33 -25 -113 -201 -136 -300 -21 -90 -24 -106 -28 -195 -5 -86 -7 -92 -43
        -135 -104 -125 -196 -278 -262 -435 -27 -66 -42 -170 -59 -415 -17 -250 -13
        -231 -88 -390 -22 -47 -54 -103 -71 -124 -17 -22 -48 -73 -68 -113 -36 -72
        -36 -75 -40 -216 -3 -137 -14 -209 -35 -234 -5 -6 -30 -53 -54 -104 -62 -126
        -75 -198 -58 -325 16 -131 19 -140 74 -279 78 -195 210 -624 224 -725 20 -151
        39 -246 65 -325 16 -49 32 -110 36 -135 3 -25 10 -74 15 -110 18 -133 28 -187
        49 -270 12 -47 26 -101 31 -120 5 -19 12 -48 15 -65 11 -54 54 -132 88 -162
        27 -23 51 -32 113 -43 43 -7 84 -17 89 -21 25 -19 161 -30 195 -16 8 3 30 8
        48 11 76 14 98 19 107 26 6 4 30 11 54 15 108 18 267 138 317 242 25 50 25 53
        15 160 -23 228 -43 324 -74 356 -12 13 -54 44 -93 70 -38 26 -84 59 -102 74
        -28 25 -183 131 -233 159 -11 6 -31 22 -45 35 -23 21 -25 30 -20 74 3 27 8 69
        10 93 12 103 29 241 37 287 5 28 12 77 18 110 11 73 27 142 51 215 26 81 46
        149 58 200 6 25 16 68 24 95 20 79 17 428 -6 540 -10 50 -20 110 -23 135 -5
        51 -24 29 189 220 87 79 299 295 336 344 21 27 23 28 41 12 10 -9 44 -67 76
        -129 67 -129 81 -149 199 -289 100 -120 253 -321 260 -343 5 -19 0 -61 -25
        -192 -31 -164 -40 -391 -20 -493 6 -30 20 -72 31 -93 26 -50 26 -57 -14 -140
        -32 -69 -193 -456 -235 -566 -17 -45 -40 -218 -33 -245 9 -31 -26 -127 -72
        -200 -89 -140 -98 -167 -106 -336 -4 -74 -13 -178 -20 -230 -8 -57 -14 -198
        -14 -348 l-1 -254 45 -17 c25 -10 88 -39 140 -64 53 -26 100 -47 104 -47 4 0
        22 -6 39 -14 18 -7 52 -23 77 -34 25 -10 56 -23 70 -26 14 -4 34 -11 45 -16
        19 -8 57 -21 62 -21 2 -1 26 -7 55 -15 50 -14 81 -21 196 -43 26 -6 101 -22
        167 -36 170 -37 216 -47 250 -50 17 -1 82 -9 145 -16 80 -10 240 -14 525 -14
        387 0 433 3 615 31 14 2 43 6 65 10 22 3 49 9 60 14 11 5 34 11 50 14 268 44
        444 86 550 131 17 7 59 23 95 35 36 12 79 28 97 36 17 8 36 14 42 14 6 0 25 8
        43 18 18 10 49 24 68 32 54 20 104 41 120 50 12 6 14 28 11 121 -2 63 -7 119
        -11 124 -4 6 -12 44 -19 85 -6 41 -16 100 -21 130 -16 96 -29 203 -35 285 -13
        170 -17 198 -41 272 -24 75 -53 127 -104 186 l-50 59 -1 161 c-1 89 -3 173 -4
        187 -6 43 -35 121 -85 225 -27 55 -65 141 -85 190 -20 50 -43 105 -52 123 -8
        18 -23 58 -33 88 -17 48 -18 58 -6 77 8 12 24 51 35 86 23 71 29 244 11 323
        -34 153 -61 334 -55 371 8 45 26 87 48 109 7 7 40 49 72 93 32 44 88 114 125
        155 120 136 163 203 229 355 16 39 37 71 45 73 9 2 40 -17 69 -41 95 -81 293
        -195 412 -239 65 -24 205 -67 285 -89 66 -17 205 -62 215 -68 6 -4 42 -20 80
        -35 39 -15 81 -33 95 -38 14 -6 34 -14 45 -19 11 -4 62 -15 113 -24 101 -17
        163 -12 272 23 102 32 203 147 321 367 53 97 73 142 138 300 19 46 58 167 64
        200 4 17 13 62 22 100 25 110 52 296 60 415 22 306 20 562 -4 770 -20 179 -23
        205 -28 297 -3 51 -3 103 0 115 4 13 31 55 62 93 101 126 133 192 160 338 5
        26 8 27 65 27 32 0 62 -5 66 -11 3 -6 10 -100 15 -208 10 -239 19 -281 68
        -330 l38 -38 269 1 c289 1 302 3 328 54 17 34 29 112 27 181 -1 29 3 59 10 67
        6 7 31 16 56 20 25 4 58 13 72 20 14 8 31 14 37 14 7 0 25 15 41 34 24 26 31
        46 36 96 4 34 5 66 2 70 -3 5 -5 145 -5 311 l0 303 -45 43 c-25 24 -54 43 -65
        43 -10 0 -21 4 -24 9 -3 4 -26 11 -52 14 -25 2 -50 9 -55 14 -5 5 -11 38 -15
        73 -8 94 -33 171 -65 201 l-28 26 -243 -4 c-269 -5 -312 -13 -341 -59 -50 -83
        -51 -87 -49 -317 l2 -218 -67 3 -68 3 -26 52 c-31 62 -60 103 -74 103 -5 0
        -23 8 -40 17 -23 12 -62 17 -170 18 -77 1 -179 6 -227 10 -63 5 -88 4 -88 -4
        0 -14 -126 -15 -135 -1 -7 12 -125 14 -125 2 0 -4 -14 -13 -32 -21 -40 -18
        -108 -79 -108 -97 0 -30 -49 -47 -138 -48 l-87 -1 -5 190 c-5 175 -7 194 -29
        243 -14 28 -28 52 -33 52 -4 0 -19 17 -33 38 l-25 37 -280 0 -280 0 -11 -35
        c-6 -19 -14 -44 -18 -55 -22 -55 -31 -96 -31 -142 0 -29 -5 -55 -12 -60 -7 -6
        -40 -13 -72 -16 -50 -5 -64 -11 -95 -41 -44 -43 -66 -108 -56 -167 4 -23 10
        -178 14 -343 l6 -301 30 -38 c37 -48 73 -67 123 -67 54 0 62 -13 62 -99 0 -83
        20 -154 52 -188 21 -23 24 -23 293 -23 l272 0 39 31 c22 17 49 51 62 77 21 43
        22 59 22 244 0 241 -7 231 142 202 22 -4 27 -12 33 -47 10 -67 54 -175 80
        -197 8 -7 15 -17 15 -22 0 -5 28 -44 61 -86 l62 -75 -38 -151 c-20 -82 -41
        -157 -45 -165 -8 -15 -32 -70 -67 -151 -32 -75 -68 -145 -75 -148 -4 -2 -8 -9
        -8 -16 0 -7 -9 -21 -20 -31 -11 -10 -26 -30 -34 -44 -31 -60 -52 -96 -64 -109
        -7 -8 -20 -28 -29 -45 -9 -18 -33 -52 -53 -77 -20 -25 -40 -53 -43 -62 -9 -24
        -22 -23 -40 5 -33 47 -105 115 -171 162 -16 11 -40 29 -55 40 -14 11 -42 27
        -61 36 -86 40 -90 42 -90 65 0 13 -4 33 -9 46 -5 13 -17 50 -26 83 -34 123
        -75 199 -108 203 -14 2 -31 10 -37 18 -7 8 -17 14 -22 14 -9 0 -62 35 -86 58
        -7 6 -17 12 -20 12 -12 0 -104 93 -186 188 -43 49 -88 94 -99 100 -35 18 -125
        34 -232 41 -55 4 -109 11 -120 15 -63 25 -92 38 -110 48 -11 6 -33 19 -50 27
        -16 9 -32 19 -35 22 -9 9 -213 106 -270 127 -30 11 -121 42 -201 67 -166 53
        -201 71 -229 117 -20 33 -26 68 -12 68 4 0 45 5 91 10 86 11 144 34 173 68 32
        40 47 82 69 202 12 67 25 96 58 132 19 22 25 42 30 101 4 42 13 82 21 92 14
        16 66 55 113 82 11 6 24 17 28 25 12 18 11 75 -1 83 -5 3 -10 15 -10 26 0 10
        -4 19 -10 19 -5 0 -10 6 -10 14 0 8 -6 27 -14 43 -45 88 -86 182 -86 196 0 9
        -4 19 -10 22 -12 8 -13 69 -1 93 32 64 42 205 20 299 -45 194 -74 268 -149
        373 -81 116 -216 231 -330 281 -14 6 -42 20 -63 30 -22 11 -47 19 -57 19 -11
        0 -21 4 -25 9 -3 6 -13 10 -23 10 -37 1 -92 14 -98 22 -3 5 -20 9 -39 9 -19 0
        -37 5 -40 10 -7 11 -307 14 -318 4z m28 -266 c4 -35 5 -87 3 -117 l-3 -54 -90
        -27 c-49 -15 -106 -34 -125 -43 -45 -19 -57 -13 -116 65 l-48 61 40 35 c49 42
        116 77 219 113 114 39 112 40 120 -33z m347 42 c46 -10 112 -31 148 -45 66
        -26 170 -91 170 -106 0 -17 -49 -41 -145 -70 -55 -17 -130 -47 -167 -67 l-67
        -36 -38 25 c-21 14 -57 33 -80 43 -49 22 -53 32 -53 146 0 131 0 130 81 130
        37 0 106 -9 151 -20z m-770 -340 l57 -45 -19 -30 c-72 -113 -110 -222 -112
        -325 -2 -124 23 -203 101 -318 42 -61 43 -62 36 -127 -4 -36 -11 -68 -16 -71
        -13 -8 -105 122 -149 211 -61 122 -75 188 -75 345 0 98 5 153 18 200 20 75 83
        213 94 208 5 -1 34 -23 65 -48z m1257 -1 c32 -43 74 -146 90 -219 23 -101 9
        -239 -27 -267 -38 -31 -182 -4 -308 59 -73 35 -71 31 -95 143 -15 70 -44 143
        -67 168 -25 28 -2 42 139 81 69 20 146 44 170 55 61 27 65 26 98 -20z m-723
        -84 c27 -8 66 -28 86 -45 49 -41 114 -139 134 -206 31 -95 -4 -219 -87 -309
        -122 -132 -310 -133 -456 -1 -77 70 -107 138 -106 246 0 69 4 95 25 140 31 68
        93 131 161 164 62 30 164 35 243 11z m482 -474 c106 -53 167 -71 246 -73 46
        -2 71 -7 80 -18 7 -8 28 -53 46 -100 17 -47 40 -99 51 -116 28 -45 24 -61 -20
        -84 -22 -11 -43 -25 -46 -31 -11 -17 -34 -121 -35 -152 0 -46 -27 -87 -56 -87
        -20 0 -25 -4 -20 -16 8 -21 -40 -241 -59 -270 -20 -31 -71 -39 -148 -24 -74
        14 -107 30 -167 79 -25 20 -63 49 -86 64 -22 15 -74 66 -115 114 -41 48 -88
        101 -105 118 -17 17 -36 41 -43 52 -13 25 -15 151 -2 171 9 14 123 52 158 52
        14 0 46 -27 95 -80 40 -44 98 -100 129 -124 30 -24 80 -69 110 -98 61 -62 105
        -86 167 -95 66 -9 54 11 -60 99 -35 26 -218 259 -218 277 0 5 -23 35 -51 65
        -57 63 -63 88 -30 134 12 17 37 65 57 106 20 42 38 76 40 76 3 0 39 -17 82
        -39z m-775 -341 c113 -54 102 41 105 -857 2 -746 1 -784 -15 -779 -10 2 -34 7
        -53 11 -19 4 -43 9 -53 12 -18 5 -19 32 -16 691 2 666 2 690 -19 777 -22 98
        -30 175 -18 175 2 0 33 -14 69 -30z m2985 -132 c9 -9 12 -157 12 -605 l0 -594
        -56 3 -56 3 -3 595 c-2 327 -1 598 1 602 8 13 89 9 102 -4z m1875 -200 c4
        -116 7 -388 7 -604 l0 -392 -51 -7 c-38 -5 -54 -4 -61 6 -11 16 -3 1150 8
        1187 5 18 13 22 49 22 l42 0 6 -212z m269 -164 c-1 -208 2 -476 7 -598 6 -153
        6 -225 -2 -234 -6 -8 -28 -12 -61 -10 l-51 3 0 163 c0 89 1 362 3 607 l2 445
        53 0 52 0 -3 -376z m-2419 256 c4 -58 6 -325 5 -595 l-3 -490 -39 -3 c-21 -2
        -43 1 -49 7 -11 11 -21 1166 -11 1183 3 5 25 8 47 6 l42 -3 8 -105z m-2926
        -82 l33 -32 0 -609 0 -609 -46 7 c-62 9 -74 14 -75 34 0 9 0 279 -1 601 -1
        603 1 640 39 640 9 0 32 -14 50 -32z m598 -118 c33 -33 56 -60 51 -60 -20 0
        -136 95 -136 112 0 21 31 2 85 -52z m2068 -185 c4 -104 6 -235 5 -290 -3 -92
        -5 -100 -23 -102 -11 -2 -29 4 -40 13 -19 14 -20 27 -20 285 0 289 1 293 50
        287 19 -3 20 -13 28 -193z m2943 -112 l-1 -267 -45 -8 c-31 -5 -47 -4 -53 5
        -4 6 -6 52 -3 101 3 49 6 167 6 263 l0 173 48 0 48 0 0 -267z m-1135 158 c50
        -103 63 -112 152 -105 82 7 127 -6 127 -34 0 -23 -40 -32 -143 -32 -69 0 -112
        -13 -102 -30 3 -5 -1 -47 -10 -92 -21 -112 -76 -222 -169 -340 l-77 -98 -134
        0 -134 0 -23 33 c-12 17 -50 66 -84 109 -76 93 -105 143 -139 231 -24 65 -25
        73 -15 155 6 48 22 116 37 152 53 135 58 138 143 95 62 -31 72 -31 171 2 l81
        26 51 -23 c83 -37 116 -37 161 0 22 17 47 29 55 28 9 -2 32 -37 52 -77z
        m-3803 -210 c15 -8 22 -21 22 -41 0 -32 -57 -181 -73 -192 -7 -4 -9 -68 -6
        -190 8 -364 7 -392 -16 -396 -11 -3 -34 -15 -52 -29 -18 -14 -37 -23 -43 -21
        -12 4 -15 1002 -3 1021 4 6 36 -21 77 -65 39 -42 81 -81 94 -87z m2928 117
        c63 -12 74 -20 74 -54 0 -29 -12 -33 -141 -40 -123 -8 -129 -5 -129 53 0 20 7
        36 18 42 23 14 106 14 178 -1z m-3854 -214 c9 -81 6 -91 -24 -104 -13 -6 -35
        -18 -49 -28 -290 -190 -440 -278 -496 -290 -24 -6 -73 -6 -112 -2 -38 4 -81 5
        -95 3 -46 -9 -30 24 30 59 30 18 101 61 156 96 56 35 146 88 200 118 55 30
        116 65 137 78 20 13 64 37 96 54 33 17 76 44 95 61 19 16 40 29 45 27 6 -1 13
        -34 17 -72z m1150 -101 c19 -44 24 -536 6 -550 -7 -7 -37 -15 -67 -19 l-53 -7
        4 229 3 229 34 73 c19 39 40 72 48 72 7 0 19 -12 25 -27z m339 -222 c118 -46
        259 -131 259 -155 0 -14 -41 -36 -69 -36 -27 0 -258 -58 -299 -76 -28 -12 -37
        -12 -44 -2 -10 13 -3 312 7 328 3 5 20 1 38 -10 18 -10 66 -32 108 -49z
        m-1487 -27 c9 -80 -4 -245 -20 -251 -8 -3 -80 16 -161 42 -82 26 -155 50 -163
        52 -11 4 -8 10 13 26 52 41 292 185 308 186 12 1 18 -12 23 -55z m-1244 -202
        c0 -5 -12 -15 -26 -23 -43 -23 -329 -323 -387 -407 -125 -179 -186 -337 -208
        -535 -8 -68 -17 -116 -23 -114 -26 9 -55 295 -45 444 9 124 32 192 110 323 90
        153 260 258 499 308 60 13 80 14 80 4z m490 -68 c123 -17 143 -23 132 -40 -4
        -5 -43 -37 -87 -69 -44 -33 -125 -103 -180 -155 -55 -53 -122 -115 -150 -139
        -120 -105 -182 -172 -241 -261 -63 -94 -95 -124 -194 -181 -170 -98 -226 -129
        -234 -129 -24 0 17 255 60 368 104 276 406 576 625 622 49 10 101 7 269 -16z
        m3170 4 c100 -29 338 -208 443 -334 53 -62 127 -193 127 -223 0 -7 -30 -11
        -92 -11 -50 0 -131 -5 -179 -11 l-88 -11 -120 97 c-178 144 -491 440 -491 465
        0 16 21 22 128 35 111 13 211 11 272 -7z m2031 -27 c22 -18 23 -25 30 -232 4
        -118 13 -254 19 -302 12 -102 17 -441 6 -475 -4 -12 -24 -31 -44 -41 -42 -22
        -162 -142 -311 -311 l-102 -115 6 -121 7 -122 -104 -4 c-56 -3 -104 -4 -105
        -3 -1 0 1 66 4 145 l6 144 32 30 c18 17 56 58 85 91 29 33 89 98 134 145 45
        47 95 101 111 120 17 20 48 46 69 60 l39 23 -7 161 c-16 418 -19 712 -7 749
        23 68 85 96 132 58z m-2597 -79 c32 -41 62 -68 177 -157 103 -81 279 -234 279
        -243 0 -4 -24 -23 -54 -41 l-55 -33 -83 72 c-80 69 -167 135 -377 283 -53 37
        -97 74 -99 82 -4 17 36 35 76 35 15 0 43 9 62 19 19 11 37 20 40 20 3 1 18
        -16 34 -37z m-2238 9 c22 -6 57 -14 79 -18 22 -5 40 -14 40 -20 0 -7 -57 -51
        -127 -100 -184 -128 -388 -289 -438 -345 -14 -17 -18 -15 -63 28 l-48 47 33
        34 c139 144 448 396 474 388 7 -2 29 -8 50 -14z m1897 -108 c29 -27 90 -75
        136 -107 45 -33 112 -84 149 -113 37 -30 90 -67 118 -83 28 -16 85 -57 128
        -90 74 -59 89 -86 43 -75 -58 13 -478 55 -553 55 -94 0 -103 -11 -22 -30 29
        -7 78 -20 108 -30 59 -19 183 -52 379 -100 143 -35 164 -46 211 -107 19 -25
        44 -50 57 -56 31 -14 29 -45 -6 -115 -29 -58 -131 -202 -180 -256 -14 -15 -59
        -51 -99 -78 -210 -142 -489 -225 -674 -199 -240 34 -428 160 -515 347 -24 51
        -28 74 -31 175 l-4 117 45 27 c58 33 109 90 143 157 39 77 44 102 33 169 -17
        109 -70 195 -130 214 -32 10 -22 29 34 62 68 42 89 49 221 78 61 13 156 38
        211 54 55 16 110 29 122 30 14 1 44 -18 76 -46z m-1473 16 c309 -75 428 -117
        473 -166 16 -19 15 -21 -29 -53 -57 -40 -81 -91 -90 -188 -6 -60 -3 -81 16
        -134 13 -35 33 -79 46 -99 22 -36 78 -89 94 -89 41 0 50 -83 26 -222 -19 -105
        -52 -171 -122 -246 -121 -132 -286 -194 -514 -196 -172 -1 -299 27 -465 104
        -111 50 -175 99 -262 199 -80 92 -132 176 -159 259 l-17 54 69 70 c38 39 88
        79 111 90 24 10 118 32 210 48 93 16 193 36 223 45 155 43 382 94 432 96 17 1
        13 3 -12 10 -19 5 -44 7 -56 4 -11 -2 -101 -9 -200 -15 -169 -9 -469 -54 -552
        -81 -18 -6 -36 -9 -39 -6 -8 8 107 119 162 157 28 18 110 78 183 132 73 55
        173 121 223 148 49 27 103 60 120 74 31 26 41 27 129 5z m4120 -204 c6 -60 14
        -203 17 -317 7 -241 29 -188 -175 -413 -222 -243 -225 -245 -267 -245 -20 0
        -46 5 -57 11 -19 10 -20 17 -13 87 17 177 64 289 210 498 146 210 157 229 200
        349 51 144 57 157 66 148 4 -4 12 -57 19 -118z m-3428 -90 c19 -8 49 -30 67
        -50 26 -30 31 -44 31 -86 0 -92 -66 -170 -144 -172 -65 -2 -166 93 -166 156 0
        37 21 75 62 113 61 57 90 65 150 39z m-1684 -190 c36 -39 41 -78 17 -125 -36
        -69 -142 -43 -174 43 -17 44 -14 56 24 94 30 30 40 35 68 29 18 -3 46 -21 65
        -41z m3387 29 c38 -18 50 -51 39 -109 -9 -48 -39 -67 -100 -63 -42 3 -51 7
        -72 38 -30 44 -24 95 13 128 31 26 74 28 120 6z m614 -124 c148 -38 249 -105
        322 -211 58 -86 69 -125 69 -246 0 -102 0 -104 -26 -113 -14 -6 -42 -24 -62
        -40 -20 -17 -42 -30 -48 -30 -7 0 -36 21 -66 48 -29 26 -71 61 -93 77 -22 16
        -69 54 -106 85 -37 30 -107 87 -155 125 -139 110 -254 224 -254 251 0 27 33
        53 83 64 67 16 259 11 336 -10z m-5139 -236 c0 -8 16 -53 34 -100 l35 -85 -63
        -62 c-83 -81 -99 -119 -93 -217 4 -83 21 -127 68 -182 l32 -37 -20 -33 c-11
        -18 -45 -73 -75 -123 -30 -49 -73 -127 -94 -172 -39 -83 -59 -98 -84 -68 -14
        17 0 192 30 370 10 61 21 146 25 190 13 174 63 344 132 453 18 29 33 56 33 60
        0 13 23 32 32 26 4 -3 8 -12 8 -20z m923 11 c38 -38 27 -285 -20 -450 -58
        -204 -145 -331 -358 -523 -55 -50 -135 -126 -177 -170 -47 -47 -101 -92 -137
        -110 -57 -31 -91 -40 -91 -24 0 4 50 58 112 121 89 90 124 119 173 141 46 21
        67 37 83 64 27 46 27 46 0 43 -21 -2 -23 4 -37 103 -11 87 -11 116 0 170 7 37
        11 112 9 175 -1 61 -3 125 -3 142 -1 38 25 69 93 116 25 17 77 60 117 94 130
        113 199 145 236 108z m3701 -10 c93 -39 203 -119 365 -266 63 -57 153 -136
        200 -176 47 -40 87 -76 89 -81 1 -5 -22 -11 -52 -14 -46 -4 -61 -11 -96 -42
        -46 -42 -47 -42 -150 5 -139 64 -291 206 -374 351 -46 81 -47 84 -42 151 4 60
        11 87 20 87 2 0 20 -7 40 -15z m-4074 -91 c0 -3 -26 -37 -57 -77 -32 -39 -63
        -78 -69 -86 -9 -12 -18 -9 -58 18 -26 18 -46 37 -44 43 10 28 228 126 228 102z
        m6020 -277 c-33 -200 -79 -343 -161 -509 -42 -84 -56 -99 -66 -71 -4 10 -18
        36 -31 58 -26 41 -39 126 -43 272 -2 83 -19 58 186 287 151 169 149 170 115
        -37z m-6300 23 c17 -12 36 -33 41 -47 13 -36 11 -100 -5 -132 -20 -37 -94 -76
        -129 -67 -40 10 -103 75 -115 119 -32 115 107 199 208 127z m1003 -223 c80
        -87 96 -112 97 -143 0 -12 13 -36 29 -53 59 -63 73 -130 34 -163 -13 -11 -25
        -3 -76 52 -32 36 -76 90 -97 120 -21 30 -61 76 -89 102 -63 59 -64 68 -15 198
        4 12 10 10 26 -10 11 -14 52 -60 91 -103z m3447 21 c78 -62 171 -122 265 -172
        67 -35 70 -38 82 -89 26 -102 70 -143 214 -197 53 -20 129 -73 129 -90 0 -14
        -177 46 -292 101 -211 99 -272 144 -382 278 -55 67 -136 219 -136 255 0 18 3
        17 28 -7 15 -15 56 -50 92 -79z m-350 18 l22 -55 -39 -49 c-21 -28 -74 -92
        -118 -144 -44 -51 -90 -107 -103 -123 -21 -29 -22 -29 -37 -11 -27 35 -18 84
        26 148 22 33 50 81 60 107 18 40 142 181 160 181 4 0 17 -24 29 -54z m1360 4
        c36 -36 40 -45 40 -90 0 -99 -49 -150 -141 -150 -55 0 -62 3 -98 39 -45 45
        -55 78 -41 129 17 66 81 110 163 111 30 1 44 -6 77 -39z m-3101 -120 c32 -17
        46 -69 46 -175 0 -94 -15 -165 -35 -165 -5 0 -11 -26 -15 -59 -5 -45 -3 -66
        10 -91 23 -45 12 -85 -33 -115 -98 -67 -293 -87 -409 -41 -92 36 -147 79 -209
        163 -73 98 -80 120 -64 191 16 72 53 130 93 147 18 7 83 23 144 35 114 21 210
        47 358 93 94 30 91 30 114 17z m2680 -9 c21 -21 51 -108 51 -146 0 -32 -30
        -54 -81 -61 -68 -9 -84 9 -83 90 1 70 19 111 57 126 32 13 35 12 56 -9z
        m-2239 -22 c159 -48 277 -78 343 -89 116 -18 181 -92 181 -202 -1 -69 -40
        -141 -122 -224 -69 -69 -135 -100 -245 -116 -78 -11 -96 -10 -155 5 -80 21
        -169 72 -187 107 -7 14 -15 72 -18 130 -3 58 -11 119 -17 135 -18 43 -15 204
        4 249 14 34 17 36 63 36 26 0 95 -14 153 -31z m878 -33 c-3 -24 -15 -58 -28
        -76 -24 -34 -90 -80 -115 -80 -36 0 -72 108 -43 127 21 13 162 71 177 72 10 1
        12 -10 9 -43z m-2352 26 c5 -4 47 -23 94 -42 111 -43 115 -48 97 -93 -9 -19
        -27 -43 -41 -52 -22 -15 -31 -15 -56 -5 -43 18 -107 92 -120 139 -14 52 -2 76
        26 53z m-1224 -47 c12 -68 9 -119 -9 -153 -21 -37 -298 -262 -360 -292 -48
        -23 -73 -18 -73 14 0 13 43 109 95 214 84 168 99 193 123 198 15 3 63 18 107
        34 44 16 87 28 95 27 9 -1 18 -18 22 -42z m778 -102 c35 -37 101 -119 148
        -183 47 -63 104 -140 126 -170 88 -119 180 -221 301 -334 182 -171 177 -163
        186 -309 4 -67 11 -147 15 -177 l7 -55 -55 60 c-31 33 -74 83 -96 110 -22 28
        -65 75 -97 105 -72 69 -85 96 -85 165 0 80 -17 112 -112 206 -81 82 -316 357
        -351 411 -9 15 -27 67 -38 115 -11 49 -22 96 -25 106 -10 32 14 17 76 -50z
        m3270 38 c0 -35 -51 -183 -81 -237 -40 -71 -270 -345 -352 -420 l-67 -61 -6
        -74 c-4 -41 -13 -86 -21 -101 -19 -39 -155 -200 -236 -280 -66 -66 -108 -89
        -92 -50 18 42 25 94 25 185 0 54 5 108 11 120 6 12 46 58 88 102 42 44 147
        154 234 245 101 106 183 203 228 269 97 144 241 321 260 321 5 0 9 -9 9 -19z
        m1418 -69 c-1 -4 -16 -34 -33 -67 -52 -104 -37 -231 38 -312 11 -13 15 -23 9
        -23 -6 0 -14 5 -17 11 -4 5 -32 21 -62 34 -84 38 -362 309 -339 332 3 3 51 -4
        106 -17 128 -29 186 -24 243 18 42 30 62 39 55 24z m278 -51 c61 -28 84 -63
        84 -128 0 -69 -20 -108 -70 -133 -71 -36 -135 -21 -184 43 -40 53 -32 112 26
        187 41 52 79 60 144 31z m-4454 -118 c28 -27 75 -77 104 -113 29 -36 85 -99
        124 -140 l70 -75 -6 -65 c-4 -36 -8 -67 -10 -69 -5 -6 -132 109 -204 186 -55
        59 -157 191 -194 251 -5 8 4 23 24 42 18 17 34 30 36 30 3 0 28 -21 56 -47z
        m2309 -9 l22 -23 -38 -43 c-21 -24 -117 -127 -214 -229 l-176 -186 -12 51 c-7
        28 -12 60 -12 71 0 37 276 343 338 375 40 20 61 17 92 -16z m-4211 -202 c52
        -25 100 -103 100 -161 0 -54 -16 -81 -73 -122 -27 -20 -52 -29 -77 -29 -45 0
        -119 39 -156 83 -23 27 -26 38 -22 89 4 49 9 63 38 93 62 64 123 79 190 47z
        m279 -244 c102 -162 121 -223 121 -392 0 -251 -15 -344 -97 -601 -66 -207 -83
        -292 -83 -426 0 -129 -9 -151 -48 -123 -22 15 -22 19 -22 297 0 341 2 353 44
        367 38 12 121 94 135 133 17 44 14 163 -5 200 -28 55 -54 75 -131 99 l-75 23
        6 125 6 125 34 30 c39 35 71 87 81 133 8 38 15 40 34 10z m2571 7 c71 -37 90
        -126 75 -361 -8 -132 -4 -126 -119 -210 -65 -49 -93 -53 -216 -33 -96 15 -145
        42 -185 103 -58 88 -77 155 -73 255 3 81 5 90 39 136 50 71 107 103 199 114
        126 14 248 13 280 -4z m645 -6 c69 -17 135 -86 160 -165 16 -52 17 -70 8 -155
        -6 -53 -18 -110 -27 -126 -47 -92 -127 -142 -241 -150 -118 -9 -137 -2 -226
        86 l-79 78 -2 129 c-3 237 4 278 60 309 22 13 52 15 163 11 74 -3 157 -10 184
        -17z m-3703 -177 c55 -36 104 -52 155 -52 l41 0 11 -75 c14 -96 14 -141 -1
        -185 -8 -25 -12 -178 -12 -515 l-1 -480 -27 -12 c-36 -18 -56 -7 -67 36 -11
        40 -44 249 -62 384 -6 48 -14 87 -17 87 -3 0 -2 -40 1 -90 4 -49 5 -90 2 -90
        -33 0 -91 293 -65 325 21 26 40 18 41 -17 1 -32 2 -31 9 7 4 22 17 65 29 95
        12 30 25 87 28 125 6 77 0 94 -83 225 -33 53 -34 57 -34 157 0 57 2 103 4 103
        3 0 24 -13 48 -28z m2159 -368 c63 -70 135 -147 161 -173 41 -41 47 -53 53
        -104 4 -32 5 -73 2 -90 -9 -56 3 -84 67 -159 34 -40 70 -85 81 -100 76 -101
        222 -271 268 -310 l54 -47 8 -328 c8 -365 8 -1341 -2 -1501 l-5 -102 -59 0
        c-33 0 -61 5 -65 12 -4 6 -7 291 -6 632 1 342 -2 720 -6 842 l-7 221 -50 57
        c-27 32 -70 85 -95 120 -111 153 -287 362 -426 506 -128 132 -134 147 -134
        317 0 113 14 286 25 321 2 6 8 12 13 12 5 0 61 -57 123 -126z m2244 -9 c26
        -166 26 -338 1 -385 -10 -19 -76 -95 -147 -168 -146 -151 -242 -268 -382 -464
        -115 -161 -130 -192 -117 -238 13 -46 23 -1080 13 -1390 l-8 -254 -58 -14
        c-45 -11 -61 -12 -70 -3 -9 9 -12 225 -13 859 -1 466 -5 898 -8 959 -5 79 -3
        120 5 135 7 13 42 55 80 95 37 39 110 124 162 190 52 65 106 130 120 145 56
        59 57 64 57 203 l0 130 166 168 c92 93 170 165 174 160 4 -4 15 -62 25 -128z
        m-4492 31 c37 -59 44 -104 22 -150 -17 -36 -52 -55 -75 -41 -42 26 -54 164
        -19 209 11 14 26 26 32 26 7 0 25 -20 40 -44z m526 -50 c32 -34 37 -84 13
        -139 -23 -51 -56 -68 -98 -48 -31 14 -44 48 -44 117 0 41 5 59 20 74 28 28 81
        26 109 -4z m2876 -102 c37 -24 55 -65 55 -126 0 -68 -25 -109 -82 -137 -70
        -33 -113 -24 -170 36 -30 31 -46 101 -34 147 8 31 52 85 80 97 31 13 120 3
        151 -17z m511 -106 c8 -16 20 -63 26 -106 10 -70 9 -81 -9 -122 -11 -26 -87
        -120 -174 -219 -85 -95 -166 -188 -182 -206 l-27 -33 0 -996 c0 -903 -1 -997
        -16 -1003 -9 -3 -41 -6 -72 -7 l-57 -1 -6 930 c-4 512 -7 1036 -8 1165 -1 129
        -2 240 -1 247 0 7 19 21 43 32 101 47 177 166 177 277 0 18 6 36 13 41 15 10
        247 41 265 35 7 -3 20 -18 28 -34z m-1031 17 c77 -8 141 -15 142 -15 0 0 4
        -28 8 -62 15 -128 61 -201 156 -252 l36 -19 6 -892 c3 -490 3 -1023 0 -1184
        l-6 -292 -60 3 c-55 3 -61 5 -67 28 -4 14 -2 248 3 521 7 332 7 651 1 963
        l-10 467 -95 97 c-86 88 -138 147 -194 223 -11 14 -48 63 -82 107 -87 114 -86
        111 -73 194 14 93 33 128 68 128 15 0 90 -7 167 -15z m-745 -511 c24 -30 51
        -61 60 -67 37 -26 233 -253 331 -383 l104 -137 8 -256 c7 -250 -3 -1285 -13
        -1294 -9 -8 -121 11 -136 23 -12 11 -14 72 -14 389 0 207 -3 536 -7 731 l-6
        354 -27 26 c-15 14 -55 61 -90 105 -150 187 -271 322 -305 338 -19 9 -35 21
        -35 27 0 5 12 40 26 77 14 38 31 80 36 96 6 15 14 27 18 27 4 0 27 -25 50 -56z
        m2412 -52 l45 -98 -60 -64 c-32 -36 -86 -101 -120 -145 -33 -44 -95 -121 -137
        -170 -42 -50 -81 -99 -87 -110 -6 -13 -7 -63 -2 -135 10 -140 18 -1187 10
        -1284 l-6 -69 -65 -18 c-43 -12 -68 -14 -75 -8 -13 13 -23 444 -24 1086 l-1
        521 43 55 c145 190 318 407 353 446 23 26 46 56 53 69 6 12 15 22 20 22 4 0
        28 -44 53 -98z m-2546 -286 c81 -87 155 -174 184 -216 13 -19 46 -61 73 -93
        l49 -57 6 -203 c7 -300 8 -1154 0 -1162 -11 -11 -132 24 -145 42 -10 12 -13
        79 -13 247 -1 127 -9 344 -19 481 -22 300 -27 315 -127 397 -37 29 -81 63
        -100 75 -18 12 -35 27 -38 32 -3 5 -6 85 -6 178 -1 121 3 184 15 226 17 64 41
        117 54 117 4 0 34 -29 67 -64z m2696 -27 c20 -55 42 -293 33 -360 -7 -47 -11
        -52 -100 -129 -119 -102 -140 -142 -139 -255 0 -64 6 -94 29 -150 32 -78 30
        -21 16 -550 l-6 -230 -35 -17 c-19 -9 -52 -20 -72 -23 -33 -6 -39 -4 -47 16
        -4 13 -9 286 -10 607 -1 460 -4 590 -15 615 -25 61 -28 129 -7 164 28 44 278
        340 299 352 26 16 35 8 54 -40z m-4329 -17 c28 -31 49 -92 42 -124 -4 -16 -20
        -45 -37 -64 -43 -48 -79 -47 -130 6 -60 64 -50 134 26 181 39 24 78 24 99 1z
        m230 -266 c18 -13 65 -40 106 -61 111 -55 277 -163 311 -202 20 -22 30 -44 30
        -65 0 -17 7 -68 15 -113 13 -68 13 -88 3 -121 -15 -45 -25 -47 -52 -11 -14 19
        -22 55 -30 126 -7 74 -14 102 -26 107 -30 13 -125 32 -132 28 -5 -3 -8 -29 -8
        -59 0 -75 40 -183 80 -215 57 -45 101 -92 97 -103 -15 -45 -143 -81 -287 -81
        -128 0 -255 13 -275 28 -8 6 -20 38 -25 71 -6 33 -19 94 -30 135 -10 41 -26
        120 -35 175 -9 55 -21 129 -27 164 -10 58 -9 65 7 78 11 7 27 13 37 13 32 0
        102 39 153 85 28 24 51 44 53 45 2 0 18 -11 35 -24z m1263 -332 c42 -20 104
        -88 104 -113 0 -11 -21 -43 -48 -72 -43 -47 -52 -52 -100 -57 -52 -5 -53 -4
        -102 45 -32 33 -50 59 -50 74 0 33 44 96 83 120 39 23 68 24 113 3z m2983 3
        c32 -16 71 -91 71 -134 0 -51 -70 -122 -128 -130 -77 -10 -152 63 -152 151 0
        82 131 153 209 113z m-2845 -651 c-2 -261 -7 -346 -21 -346 -24 0 -108 39
        -119 55 -10 16 -14 84 -16 285 l-3 265 75 11 c41 6 77 12 80 13 3 0 4 -127 4
        -283z m-274 249 c16 -19 18 -491 2 -507 -22 -22 -84 19 -95 62 -15 55 14 429
        35 456 10 14 43 8 58 -11z m3214 -28 c-4 -25 3 -104 16 -187 12 -80 23 -173
        24 -208 1 -76 -8 -86 -129 -133 -44 -17 -91 -37 -104 -46 -46 -29 -46 -24 -54
        393 l-4 192 88 7 c48 3 100 10 116 15 51 15 53 13 47 -33z"/>
                    <path d="M5439 5552 c-96 -61 -124 -137 -95 -252 37 -145 167 -192 286 -105
        60 44 99 95 116 151 16 52 8 85 -35 148 -49 70 -77 86 -158 86 -59 0 -76 -4
        -114 -28z m141 -92 c10 -5 26 -29 35 -53 28 -73 -3 -117 -83 -117 -53 0 -74
        25 -75 89 -1 63 21 91 70 91 19 0 43 -4 53 -10z"/>
                    <path d="M3465 5568 c-16 -6 -55 -28 -85 -49 -127 -89 -138 -179 -36 -296 50
        -57 107 -83 183 -83 52 0 68 5 109 33 139 92 116 312 -41 386 -49 23 -84 25
        -130 9z m123 -151 c41 -38 17 -135 -36 -149 -47 -13 -132 53 -132 102 0 29 32
        65 65 73 32 8 78 -4 103 -26z"/>
                    <path d="M3635 9270 c-16 -4 -82 -20 -145 -35 -63 -14 -126 -30 -140 -35 -14
        -5 -72 -23 -130 -40 -497 -152 -1022 -429 -1435 -759 -343 -273 -646 -594
        -893 -946 -431 -614 -708 -1351 -782 -2080 -6 -60 -15 -138 -20 -171 -13 -79
        -13 -545 -1 -632 6 -37 15 -116 21 -177 13 -124 34 -264 57 -375 8 -41 19 -93
        23 -115 5 -22 20 -85 35 -140 177 -677 511 -1308 965 -1825 l31 -35 -6 65 c-4
        36 -11 69 -16 74 -5 6 -9 20 -9 32 0 13 -4 26 -10 29 -5 3 -10 17 -10 30 0 13
        -4 25 -10 27 -5 2 -12 34 -16 73 -7 63 -12 76 -59 140 -70 94 -170 248 -240
        370 -53 91 -195 368 -195 379 0 2 -13 33 -29 68 -114 246 -233 642 -286 953
        -140 814 -50 1627 262 2384 364 880 1026 1625 1863 2097 95 54 353 184 365
        184 2 0 28 11 57 24 158 70 425 161 632 214 63 16 112 34 116 42 4 8 26 52 49
        97 22 46 41 85 41 88 0 7 -50 4 -85 -5z"/>
                    <path d="M5670 9223 c0 -9 34 -78 41 -83 6 -5 22 -46 24 -65 1 -5 4 -17 7 -25
        4 -8 8 -21 10 -28 2 -7 71 -35 153 -63 313 -106 596 -236 865 -397 81 -49 270
        -173 309 -203 21 -17 43 -19 167 -19 81 0 144 4 144 9 0 13 -286 225 -416 309
        -199 126 -438 254 -639 340 -91 39 -320 127 -365 140 -19 6 -95 28 -167 50
        -73 22 -133 38 -133 35z"/>
                    <path d="M3457 8850 c-178 -52 -211 -63 -398 -136 -1341 -526 -2316 -1724
        -2553 -3136 -48 -286 -51 -328 -51 -703 0 -292 4 -385 18 -490 76 -540 193
        -923 424 -1380 36 -71 71 -140 77 -152 6 -13 14 -23 19 -23 11 0 9 28 -3 35
        -6 3 -10 17 -10 30 0 13 -4 26 -9 29 -5 3 -12 23 -15 43 -8 43 -20 78 -47 141
        -11 24 -27 62 -35 85 -9 23 -20 51 -25 62 -19 42 -32 157 -36 323 -2 97 0 179
        5 185 5 7 12 29 16 50 4 20 10 37 14 37 4 0 13 15 21 32 28 67 45 103 50 108
        28 25 36 64 39 210 2 85 8 159 13 165 5 5 9 19 9 30 0 29 35 96 91 175 25 36
        62 101 83 145 21 44 42 88 48 99 10 19 27 205 35 381 2 55 9 104 14 110 5 5 9
        33 9 61 0 29 5 56 10 59 6 4 10 12 9 18 -4 21 13 68 47 136 19 36 34 69 34 73
        0 11 53 92 63 96 4 2 7 9 7 16 0 7 9 21 20 31 11 10 20 22 20 27 0 12 45 74
        86 118 31 33 33 40 43 150 12 140 20 188 32 196 5 3 9 16 9 29 0 23 19 74 43
        120 6 11 18 34 27 50 30 56 120 170 205 259 55 56 125 110 195 149 14 7 34 18
        45 25 18 10 72 33 120 52 11 4 31 12 45 19 24 11 149 27 280 37 36 3 76 10 90
        16 66 29 97 44 120 59 14 9 70 40 125 69 55 29 102 56 105 59 3 3 14 11 25 17
        56 30 91 50 95 54 3 3 14 10 25 16 103 56 144 80 167 95 14 11 29 19 32 19 4
        0 25 12 47 26 41 26 103 61 172 98 29 15 37 26 37 47 0 15 5 31 10 34 6 3 10
        16 10 29 0 12 3 26 8 30 6 7 24 82 38 161 3 17 9 39 14 50 5 11 11 34 14 50 3
        17 8 45 12 63 4 23 2 38 -9 50 -9 9 -30 44 -48 77 -17 33 -38 71 -45 85 -8 14
        -14 33 -14 42 0 9 -4 20 -10 23 -5 3 -10 19 -10 34 0 15 -4 31 -9 37 -16 16
        -23 94 -27 307 -3 114 -8 207 -12 206 -4 -1 -51 -14 -105 -29z"/>
                    <path d="M5790 8651 c0 -88 -4 -162 -9 -166 -6 -3 -4 -17 5 -33 7 -15 14 -31
        14 -37 0 -5 16 -44 36 -85 20 -41 40 -86 46 -100 6 -14 15 -34 21 -45 6 -11
        13 -64 15 -118 l4 -99 -58 -60 c-33 -33 -71 -66 -86 -74 -25 -13 -28 -20 -28
        -69 0 -29 -4 -57 -10 -60 -5 -3 -10 -15 -10 -25 0 -10 -12 -32 -26 -49 -14
        -17 -28 -49 -31 -71 -3 -22 -10 -43 -14 -46 -5 -3 -9 -20 -9 -39 0 -19 -4 -37
        -10 -40 -5 -3 -10 -15 -10 -26 0 -27 -18 -57 -65 -106 -29 -32 -35 -43 -22
        -43 10 0 26 -4 37 -10 11 -6 29 -14 40 -20 11 -5 29 -10 39 -10 11 0 23 -4 26
        -10 3 -5 13 -10 22 -10 18 0 208 -92 278 -135 73 -44 155 -82 195 -90 19 -4
        78 -10 130 -14 52 -4 102 -10 110 -14 13 -6 15 18 12 195 -1 112 -7 222 -12
        245 -12 52 -13 450 -1 457 5 3 12 18 16 33 7 28 81 106 126 132 13 8 38 17 54
        21 27 5 30 10 33 50 2 25 7 49 13 54 5 6 9 20 9 32 0 13 4 25 9 28 4 3 11 20
        15 38 4 19 25 51 51 78 l45 46 -134 77 c-172 100 -400 212 -546 270 -140 55
        -288 107 -307 107 -10 0 -13 -33 -13 -159z"/>
                    <path d="M7670 6742 c0 -77 -19 -113 -101 -193 -77 -75 -92 -80 -234 -77 -193
        3 -264 3 -270 -4 -5 -5 32 -96 66 -160 5 -10 6 -24 3 -32 -3 -8 -1 -17 5 -21
        6 -3 11 -15 11 -26 0 -10 4 -27 9 -37 5 -9 12 -25 15 -35 3 -9 16 -22 28 -28
        47 -21 116 -70 178 -127 l25 -23 23 28 c12 15 25 37 28 48 4 11 9 22 13 25 3
        3 11 12 16 21 6 9 26 41 46 70 35 51 74 123 97 179 9 21 33 75 73 165 5 11 13
        47 18 80 6 33 13 72 17 88 5 21 0 35 -20 61 -14 19 -26 39 -26 45 0 6 -4 11
        -10 11 -6 0 -10 -26 -10 -58z"/>
                    <path d="M8717 6478 c2 -40 6 -86 9 -103 14 -79 25 -221 33 -440 5 -141 16
        -273 25 -319 35 -176 66 -517 66 -725 0 -322 -45 -687 -124 -1016 -141 -582
        -409 -1138 -777 -1610 -363 -467 -778 -823 -1324 -1136 l-60 -35 -3 -58 c-2
        -33 2 -64 7 -69 6 -6 11 -24 11 -39 0 -15 5 -28 10 -28 6 0 42 18 81 40 39 22
        72 40 74 40 2 0 57 32 122 71 649 391 1204 959 1578 1614 57 100 175 335 238
        475 43 96 127 334 168 475 16 55 33 114 38 130 5 17 16 64 25 105 9 41 21 91
        26 110 15 61 58 341 70 455 6 61 15 138 20 171 6 34 10 171 10 304 0 133 -4
        270 -10 304 -5 33 -14 111 -20 171 -24 233 -88 563 -147 760 -31 102 -124 374
        -137 399 -12 24 -13 20 -9 -46z"/>
                    <path d="M8678 5075 c-3 -5 -9 -32 -13 -60 -3 -27 -10 -59 -14 -70 -5 -11 -21
        -58 -36 -105 -15 -47 -37 -105 -47 -130 -11 -25 -24 -54 -28 -65 -17 -41 -95
        -200 -100 -205 -4 -3 -9 -12 -13 -20 -7 -17 -53 -94 -81 -136 -34 -50 -226
        -239 -258 -253 -67 -30 -110 -35 -283 -35 -166 0 -256 10 -310 33 -11 5 -36
        16 -55 24 -19 9 -61 25 -93 37 -32 12 -71 28 -85 36 -15 8 -35 14 -44 14 -9 0
        -20 5 -23 10 -3 6 -22 10 -41 10 -19 0 -34 5 -34 10 0 6 -11 10 -24 10 -14 0
        -27 4 -30 9 -3 4 -28 11 -55 15 -28 4 -53 11 -56 16 -3 6 -19 10 -35 10 -16 0
        -32 5 -35 10 -3 6 -17 10 -30 10 -13 0 -27 5 -30 10 -3 6 -14 10 -23 10 -24 0
        -224 103 -292 150 -37 26 -70 34 -70 18 0 -23 -86 -147 -146 -212 -71 -75
        -124 -141 -124 -153 0 -5 -9 -15 -20 -23 -11 -8 -20 -19 -20 -25 0 -6 -16 -26
        -35 -45 -19 -19 -35 -39 -35 -46 0 -6 -7 -17 -15 -24 -17 -14 -20 -70 -6 -85
        12 -12 29 -130 42 -290 11 -136 4 -372 -13 -392 -13 -16 -14 -92 -2 -102 12
        -8 34 -48 34 -62 0 -11 22 -67 41 -101 5 -10 9 -25 9 -33 0 -8 5 -15 10 -15 6
        0 10 -5 10 -11 0 -7 18 -50 40 -96 22 -47 40 -89 40 -94 0 -5 4 -17 9 -27 23
        -45 30 -74 42 -165 6 -55 9 -141 6 -192 -5 -85 -4 -95 15 -112 40 -35 118
        -164 118 -195 0 -9 5 -20 10 -23 6 -3 10 -17 10 -30 0 -13 4 -26 8 -29 9 -5
        20 -99 29 -236 10 -158 16 -206 24 -215 5 -5 9 -32 9 -61 0 -82 14 -85 112
        -28 597 345 1137 884 1480 1474 323 556 496 1104 553 1745 15 174 18 562 3
        540z"/>
                    <path d="M2479 4307 c-74 -72 -152 -145 -172 -162 l-37 -30 10 -70 c12 -87 11
        -571 -1 -645 -18 -117 -21 -130 -30 -136 -5 -3 -9 -16 -9 -29 0 -26 -24 -109
        -40 -137 -6 -10 -10 -28 -10 -41 0 -13 -4 -27 -9 -32 -5 -6 -15 -41 -21 -80
        -6 -38 -15 -95 -21 -125 -14 -80 -28 -174 -38 -260 -10 -84 -7 -89 62 -125 21
        -11 45 -28 54 -37 9 -10 21 -18 28 -18 6 0 22 -11 35 -25 13 -14 29 -25 36
        -25 7 0 14 -3 16 -7 4 -11 95 -83 103 -83 10 0 77 -52 115 -90 36 -35 57 -75
        62 -119 3 -26 28 -42 28 -18 0 8 7 21 16 28 9 7 20 22 25 34 11 25 32 58 41
        65 14 11 30 98 38 205 9 120 15 154 36 202 8 17 14 34 14 37 0 3 9 28 21 54
        26 59 43 100 57 132 5 14 17 43 27 65 9 22 20 49 24 60 5 11 17 40 28 65 11
        25 28 62 37 83 18 42 21 118 6 133 -14 14 -6 472 9 569 24 157 24 161 3 186
        -19 22 -65 80 -127 155 -14 18 -25 36 -25 42 0 6 -8 17 -17 24 -39 29 -185
        214 -206 261 -6 15 -16 27 -22 27 -5 0 -71 -60 -146 -133z"/>
                    <path d="M2350 1181 c-8 -4 -25 -13 -37 -19 -12 -7 -40 -15 -63 -18 -22 -4
        -40 -10 -40 -15 0 -5 -11 -9 -25 -9 -14 0 -25 -3 -25 -7 0 -12 364 -223 384
        -223 3 0 6 47 6 104 l0 104 -81 46 c-84 47 -93 50 -119 37z"/>
                </g>
            </svg>
            <h4 className={`hidden md:block font-bold text-white ${textSize}`}>GYMTRACK</h4>
        </Link>
    );
};