import { Link } from "@remix-run/react";
import type { PropsWithChildren } from "react";

const AlumnuxLogo = () => (
  <svg viewBox="0 0 182 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M123.595 69.8213H168.997V84.9553C168.997 87.7414 166.738 90 163.952 90H128.639C125.853 90 123.595 87.7414 123.595 84.9553V69.8213Z"
      fill="#F7F1FF"
    />
    <path
      d="M0 23.3458C0 21.1525 1.77803 19.3745 3.97134 19.3745H177.637C179.83 19.3745 181.608 21.1525 181.608 23.3458V65.8499C181.608 68.0432 179.83 69.8213 177.637 69.8213H3.97135C1.77804 69.8213 0 68.0432 0 65.8499V23.3458Z"
      fill="#1F316F"
    />
    <path
      d="M28.6368 37.0309C29.3313 38.9148 29.966 40.6311 30.5407 42.1798C30.7882 42.8424 31.0317 43.501 31.2712 44.1556C31.5107 44.8022 31.7302 45.4009 31.9298 45.9517C32.1373 46.4946 32.3129 46.9615 32.4566 47.3527C32.6003 47.7359 32.6961 47.9913 32.744 48.1191C32.9436 48.6699 33.0992 49.105 33.211 49.4243C33.3228 49.7436 33.4465 49.9871 33.5822 50.1547C33.7259 50.3223 33.9055 50.4341 34.1211 50.49C34.3366 50.5379 34.6479 50.5658 35.055 50.5738V52.6933C34.5841 52.6933 34.125 52.6893 33.678 52.6813C33.2389 52.6733 32.728 52.6693 32.1453 52.6693C31.4588 52.6693 30.7842 52.6733 30.1216 52.6813C29.467 52.6813 28.7566 52.6853 27.9902 52.6933V50.7175C28.0221 50.7175 28.066 50.7175 28.1219 50.7175C28.1858 50.7175 28.2497 50.7175 28.3135 50.7175C28.3774 50.7175 28.4372 50.7175 28.4931 50.7175C28.549 50.7095 28.5889 50.7055 28.6129 50.7055C28.996 50.6896 29.2595 50.6496 29.4032 50.5858C29.5469 50.5219 29.6187 50.4102 29.6187 50.2505C29.6187 50.1547 29.5988 50.0389 29.5588 49.9032C29.5189 49.7595 29.467 49.5959 29.4032 49.4123L28.6368 47.1491H23.1167C23.0927 47.237 23.0368 47.4086 22.949 47.664C22.8612 47.9115 22.7654 48.1789 22.6616 48.4663C22.5658 48.7537 22.478 49.0211 22.3982 49.2686C22.3184 49.5161 22.2705 49.6717 22.2545 49.7356C22.2146 49.8474 22.1827 49.9511 22.1587 50.0469C22.1428 50.1347 22.1348 50.2066 22.1348 50.2625C22.1348 50.4381 22.1867 50.5578 22.2904 50.6217C22.4022 50.6776 22.5858 50.7095 22.8413 50.7175C22.8652 50.7175 22.9171 50.7215 22.9969 50.7295C23.0768 50.7295 23.1646 50.7295 23.2604 50.7295C23.3562 50.7295 23.444 50.7295 23.5238 50.7295C23.6116 50.7295 23.6715 50.7295 23.7034 50.7295V52.6933C23.2164 52.6933 22.7255 52.6893 22.2306 52.6813C21.7356 52.6733 21.2008 52.6693 20.626 52.6693C20.3466 52.6693 20.0832 52.6693 19.8357 52.6693C19.5962 52.6693 19.3607 52.6733 19.1292 52.6813C18.8977 52.6813 18.6622 52.6853 18.4227 52.6933C18.1833 52.6933 17.9278 52.6933 17.6564 52.6933V50.5618C17.9438 50.5299 18.1753 50.502 18.3509 50.478C18.5345 50.4541 18.6862 50.4102 18.8059 50.3463C18.9257 50.2744 19.0294 50.1747 19.1172 50.0469C19.2051 49.9112 19.2969 49.7236 19.3927 49.4841C19.4565 49.3325 19.5563 49.085 19.692 48.7417C19.8277 48.3985 19.9834 47.9953 20.159 47.5323C20.3426 47.0693 20.5422 46.5664 20.7577 46.0236C20.9733 45.4727 21.1928 44.9139 21.4163 44.3472C21.6398 43.7804 21.8594 43.2216 22.0749 42.6708C22.2904 42.1199 22.49 41.613 22.6736 41.15C22.8572 40.679 23.0169 40.2719 23.1526 39.9286C23.2883 39.5774 23.3881 39.3219 23.4519 39.1623L24.0028 37.0309H28.6368ZM23.6675 45.5925H28.086L25.9426 39.294L25.9187 39.282L23.6675 45.5925Z"
      fill="white"
    />
    <path
      d="M39.2427 37.0309C39.2986 37.0309 39.4383 37.0349 39.6618 37.0428C39.8933 37.0428 40.1527 37.0468 40.4401 37.0548C40.7275 37.0548 41.0149 37.0588 41.3023 37.0668C41.5977 37.0668 41.8411 37.0668 42.0327 37.0668C42.4159 37.0668 42.7911 37.0668 43.1583 37.0668C43.5255 37.0668 43.9007 37.0668 44.2839 37.0668C44.6671 37.0588 45.0662 37.0548 45.4813 37.0548C45.8964 37.0468 46.3435 37.0388 46.8224 37.0309V39.1623H46.0441C45.7727 39.1623 45.5611 39.2022 45.4095 39.282C45.2578 39.3619 45.142 39.4656 45.0622 39.5934C44.9904 39.7211 44.9465 39.8688 44.9305 40.0364C44.9145 40.1961 44.9065 40.3597 44.9065 40.5274V45.4847C44.9065 46.9137 44.9105 48.5302 44.9185 50.3343H48.7862C49.0896 50.3343 49.3251 50.2704 49.4927 50.1427C49.6683 50.015 49.7961 49.8274 49.8759 49.5799C49.9637 49.3245 50.0196 49.0131 50.0435 48.6459C50.0675 48.2787 50.0794 47.8556 50.0794 47.3767H52.2708V52.6933H39.2427V50.5618H39.8055C40.0929 50.5618 40.3164 50.5259 40.4761 50.4541C40.6437 50.3822 40.7634 50.2864 40.8353 50.1667C40.9151 50.0469 40.963 49.9032 40.979 49.7356C40.9949 49.568 41.0029 49.3883 41.0029 49.1968V40.3837C41.0029 40.224 40.991 40.0723 40.967 39.9286C40.9431 39.777 40.8912 39.6452 40.8113 39.5335C40.7315 39.4217 40.6118 39.3339 40.4521 39.2701C40.2924 39.1982 40.0769 39.1623 39.8055 39.1623H39.2427V37.0309Z"
      fill="white"
    />
    <path
      d="M56.6979 37.0309C56.8176 37.0309 57.0052 37.0349 57.2607 37.0428C57.5241 37.0428 57.8075 37.0468 58.1109 37.0548C58.4142 37.0548 58.7176 37.0588 59.0209 37.0668C59.3322 37.0668 59.5997 37.0668 59.8232 37.0668C60.1345 37.0668 60.4379 37.0668 60.7332 37.0668C61.0366 37.0668 61.3439 37.0668 61.6553 37.0668C61.9666 37.0588 62.2899 37.0548 62.6252 37.0548C62.9684 37.0468 63.3317 37.0388 63.7148 37.0309V39.1623H63.3197C63.0323 39.1623 62.8088 39.2022 62.6491 39.282C62.4974 39.3539 62.3817 39.4537 62.3019 39.5814C62.23 39.7011 62.1861 39.8448 62.1701 40.0125C62.1542 40.1721 62.1462 40.3358 62.1462 40.5034V46.742C62.1462 47.3807 62.1941 47.9474 62.2899 48.4424C62.3937 48.9293 62.5653 49.3404 62.8048 49.6757C63.0443 50.003 63.3676 50.2545 63.7747 50.4301C64.1818 50.5977 64.6927 50.6816 65.3074 50.6816C65.8662 50.6816 66.3292 50.6017 66.6964 50.4421C67.0636 50.2824 67.355 50.0429 67.5706 49.7236C67.7861 49.4043 67.9378 49.0092 68.0256 48.5382C68.1134 48.0672 68.1573 47.5204 68.1573 46.8977V40.4076C68.1573 40.2559 68.1493 40.1083 68.1334 39.9646C68.1174 39.8129 68.0695 39.6772 67.9897 39.5574C67.9098 39.4377 67.7861 39.3419 67.6185 39.2701C67.4588 39.1982 67.2353 39.1623 66.9479 39.1623H66.5168V37.0309C66.6206 37.0388 66.8042 37.0468 67.0676 37.0548C67.3311 37.0548 67.6224 37.0548 67.9418 37.0548C68.2611 37.0548 68.5804 37.0548 68.8997 37.0548C69.219 37.0548 69.4944 37.0548 69.7259 37.0548C69.8537 37.0548 70.0213 37.0548 70.2289 37.0548C70.4364 37.0548 70.6639 37.0548 70.9114 37.0548C71.1668 37.0468 71.4303 37.0428 71.7017 37.0428C71.9811 37.0349 72.2485 37.0309 72.504 37.0309V39.1623H71.9412C71.6618 39.1623 71.4502 39.2102 71.3065 39.306C71.1708 39.3938 71.071 39.5055 71.0072 39.6413C70.9513 39.777 70.9234 39.9246 70.9234 40.0843C70.9234 40.236 70.9234 40.3757 70.9234 40.5034V46.7061C70.9234 47.7359 70.8076 48.6459 70.5761 49.4362C70.3446 50.2186 69.9774 50.8771 69.4745 51.412C68.9795 51.9389 68.3329 52.338 67.5346 52.6094C66.7443 52.8729 65.7864 53.0046 64.6608 53.0046C63.5272 53.0046 62.5533 52.8809 61.7391 52.6334C60.9328 52.3779 60.2702 51.9948 59.7513 51.4838C59.2404 50.965 58.8652 50.3183 58.6258 49.544C58.3863 48.7617 58.2665 47.8437 58.2665 46.7899V40.0843C58.2665 39.9965 58.2585 39.9007 58.2426 39.7969C58.2266 39.6852 58.1827 39.5854 58.1109 39.4976C58.039 39.4018 57.9312 39.3219 57.7876 39.2581C57.6518 39.1942 57.4603 39.1623 57.2128 39.1623H56.6979V37.0309Z"
      fill="white"
    />
    <path
      d="M77.3981 37.0309C77.5099 37.0309 77.7055 37.0349 77.9849 37.0428C78.2722 37.0428 78.5876 37.0468 78.9308 37.0548C79.2741 37.0548 79.6213 37.0548 79.9726 37.0548C80.3238 37.0548 80.6232 37.0548 80.8707 37.0548C81.0862 37.0548 81.3377 37.0548 81.625 37.0548C81.9204 37.0548 82.2278 37.0548 82.5471 37.0548C82.8744 37.0468 83.2017 37.0428 83.529 37.0428C83.8563 37.0349 84.1716 37.0309 84.4749 37.0309L86.295 42.5151C86.5185 43.2016 86.7381 43.8722 86.9536 44.5268C87.1771 45.1814 87.3727 45.7681 87.5403 46.287C87.708 46.7979 87.8437 47.213 87.9475 47.5323C88.0592 47.8437 88.1151 47.9993 88.1151 47.9993C88.187 47.7279 88.3147 47.3128 88.4983 46.754C88.6819 46.1872 88.8934 45.5486 89.1329 44.8381C89.3804 44.1196 89.6398 43.3653 89.9113 42.575C90.1827 41.7847 90.4421 41.0303 90.6896 40.3118C90.9371 39.5854 91.1566 38.9308 91.3482 38.348C91.5478 37.7653 91.6914 37.3262 91.7793 37.0309C92.0666 37.0309 92.386 37.0349 92.7372 37.0428C93.0964 37.0428 93.4557 37.0468 93.8149 37.0548C94.1821 37.0548 94.5333 37.0548 94.8686 37.0548C95.2039 37.0548 95.4913 37.0548 95.7308 37.0548C95.9224 37.0548 96.1738 37.0548 96.4852 37.0548C96.8045 37.0548 97.1238 37.0548 97.4431 37.0548C97.7624 37.0468 98.0498 37.0428 98.3052 37.0428C98.5607 37.0349 98.7323 37.0309 98.8201 37.0309V39.1623H98.2095C97.962 39.1623 97.7664 39.1822 97.6227 39.2222C97.487 39.2541 97.3832 39.306 97.3114 39.3778C97.2475 39.4417 97.2076 39.5255 97.1916 39.6293C97.1757 39.7331 97.1677 39.8528 97.1677 39.9885V44.7543C97.1677 46.1353 97.1717 47.704 97.1797 49.4602C97.1797 49.6757 97.1916 49.8553 97.2156 49.999C97.2395 50.1427 97.2874 50.2585 97.3593 50.3463C97.4391 50.4261 97.5509 50.482 97.6946 50.5139C97.8383 50.5459 98.0298 50.5618 98.2693 50.5618H98.8561V52.6933C98.5527 52.6933 98.2574 52.6933 97.97 52.6933C97.6826 52.6853 97.3832 52.6813 97.0719 52.6813C96.7685 52.6813 96.4452 52.6813 96.102 52.6813C95.7667 52.6733 95.4035 52.6693 95.0123 52.6693C94.6691 52.6693 94.3617 52.6733 94.0903 52.6813C93.8269 52.6813 93.5754 52.6813 93.3359 52.6813C93.1044 52.6813 92.8769 52.6853 92.6534 52.6933C92.4378 52.6933 92.2103 52.6933 91.9708 52.6933V50.5618H92.4618C92.7332 50.5618 92.9448 50.5299 93.0964 50.466C93.2561 50.3942 93.3758 50.2944 93.4557 50.1667C93.5435 50.031 93.5993 49.8673 93.6233 49.6757C93.6472 49.4841 93.6592 49.2686 93.6592 49.0291V38.9348L92.9767 40.8147L88.7378 52.6933H86.5345C86.4627 52.5017 86.3549 52.2063 86.2112 51.8072C86.0675 51.408 85.8999 50.945 85.7083 50.4181C85.5247 49.8833 85.3251 49.3045 85.1096 48.6819C84.894 48.0512 84.6745 47.4166 84.451 46.7779C84.2275 46.1313 84.0039 45.4967 83.7804 44.874C83.5649 44.2514 83.3613 43.6766 83.1697 43.1497C82.9861 42.6149 82.8225 42.1479 82.6788 41.7487C82.5431 41.3416 82.4393 41.0423 82.3674 40.8507L82.0322 39.9167C81.9923 39.8049 81.9483 39.6931 81.9005 39.5814C81.8605 39.4616 81.8246 39.3579 81.7927 39.2701C81.7528 39.1663 81.7168 39.0665 81.6849 38.9707V49.4961C81.6849 49.7356 81.6969 49.9272 81.7208 50.0709C81.7528 50.2066 81.8047 50.3104 81.8765 50.3822C81.9563 50.4541 82.0641 50.502 82.1998 50.5259C82.3435 50.5499 82.5311 50.5618 82.7626 50.5618H83.3374V52.6933C83.1059 52.6933 82.8823 52.6933 82.6668 52.6933C82.4513 52.6853 82.2278 52.6813 81.9962 52.6813C81.7647 52.6813 81.5173 52.6813 81.2538 52.6813C80.9984 52.6733 80.715 52.6693 80.4037 52.6693C80.0684 52.6693 79.765 52.6733 79.4936 52.6813C79.2222 52.6813 78.9667 52.6813 78.7273 52.6813C78.4878 52.6813 78.2523 52.6853 78.0208 52.6933C77.7973 52.6933 77.5657 52.6933 77.3263 52.6933V50.5618H77.913C78.2004 50.5618 78.4199 50.5339 78.5716 50.478C78.7233 50.4141 78.831 50.3263 78.8949 50.2146C78.9588 50.1028 78.9947 49.9671 79.0027 49.8074C79.0186 49.6478 79.0306 49.4642 79.0386 49.2566L79.0506 40.2519C79.0506 40.0604 79.0346 39.8967 79.0027 39.761C78.9787 39.6253 78.9268 39.5135 78.847 39.4257C78.7752 39.3299 78.6674 39.2621 78.5237 39.2222C78.38 39.1822 78.1924 39.1623 77.9609 39.1623H77.3981V37.0309Z"
      fill="white"
    />
    <path
      d="M106.959 37.0309C107.007 37.0309 107.103 37.0309 107.247 37.0309C107.39 37.0309 107.558 37.0309 107.75 37.0309C107.949 37.0309 108.157 37.0309 108.372 37.0309C108.596 37.0309 108.803 37.0309 108.995 37.0309C109.195 37.0309 109.366 37.0309 109.51 37.0309C109.662 37.0309 109.761 37.0309 109.809 37.0309L116.647 48.5621H116.67L116.659 40.1681C116.659 39.9446 116.643 39.769 116.611 39.6413C116.579 39.5055 116.519 39.4018 116.431 39.3299C116.343 39.2581 116.219 39.2142 116.06 39.1982C115.908 39.1743 115.709 39.1623 115.461 39.1623H114.91V37.0309C115.509 37.0309 116.044 37.0349 116.515 37.0428C116.994 37.0508 117.429 37.0548 117.82 37.0548C117.876 37.0548 117.964 37.0548 118.083 37.0548C118.211 37.0548 118.355 37.0548 118.515 37.0548C118.674 37.0548 118.846 37.0548 119.029 37.0548C119.213 37.0468 119.397 37.0428 119.58 37.0428C120.011 37.0428 120.482 37.0388 120.993 37.0309V39.1623H120.383C120.111 39.1623 119.904 39.1942 119.76 39.2581C119.616 39.314 119.508 39.3978 119.437 39.5095C119.373 39.6133 119.333 39.745 119.317 39.9047C119.309 40.0564 119.305 40.224 119.305 40.4076C119.305 40.4236 119.305 40.6152 119.305 40.9824C119.305 41.3496 119.305 41.8286 119.305 42.4193C119.305 43.002 119.305 43.6646 119.305 44.407C119.305 45.1494 119.305 45.9078 119.305 46.6822V52.8609H115.365L108.169 40.8626H108.145L108.157 49.5081C108.157 49.7556 108.169 49.9511 108.193 50.0948C108.225 50.2305 108.284 50.3343 108.372 50.4062C108.468 50.478 108.596 50.5219 108.755 50.5379C108.915 50.5538 109.127 50.5618 109.39 50.5618H109.977V52.6933C109.522 52.6933 109.059 52.6893 108.588 52.6813C108.125 52.6733 107.586 52.6693 106.971 52.6693C106.628 52.6693 106.317 52.6733 106.037 52.6813C105.758 52.6813 105.49 52.6813 105.235 52.6813C104.988 52.6813 104.744 52.6853 104.505 52.6933C104.265 52.6933 104.018 52.6933 103.762 52.6933V50.5618H104.385C104.68 50.5618 104.904 50.5339 105.055 50.478C105.215 50.4221 105.331 50.3383 105.403 50.2265C105.475 50.1148 105.514 49.9751 105.522 49.8074C105.53 49.6318 105.534 49.4283 105.534 49.1968V40.3717C105.534 40.1322 105.526 39.9366 105.51 39.7849C105.494 39.6253 105.447 39.5016 105.367 39.4137C105.295 39.318 105.183 39.2541 105.031 39.2222C104.88 39.1822 104.672 39.1623 104.409 39.1623H103.786V37.0309H106.959Z"
      fill="white"
    />
    <path
      d="M125.624 37.0309C125.744 37.0309 125.931 37.0349 126.187 37.0428C126.45 37.0428 126.734 37.0468 127.037 37.0548C127.34 37.0548 127.644 37.0588 127.947 37.0668C128.258 37.0668 128.526 37.0668 128.749 37.0668C129.061 37.0668 129.364 37.0668 129.659 37.0668C129.963 37.0668 130.27 37.0668 130.581 37.0668C130.893 37.0588 131.216 37.0548 131.551 37.0548C131.894 37.0468 132.258 37.0388 132.641 37.0309V39.1623H132.246C131.958 39.1623 131.735 39.2022 131.575 39.282C131.423 39.3539 131.308 39.4537 131.228 39.5814C131.156 39.7011 131.112 39.8448 131.096 40.0125C131.08 40.1721 131.072 40.3358 131.072 40.5034V46.742C131.072 47.3807 131.12 47.9474 131.216 48.4424C131.32 48.9293 131.491 49.3404 131.731 49.6757C131.97 50.003 132.294 50.2545 132.701 50.4301C133.108 50.5977 133.619 50.6816 134.233 50.6816C134.792 50.6816 135.255 50.6017 135.622 50.4421C135.99 50.2824 136.281 50.0429 136.497 49.7236C136.712 49.4043 136.864 49.0092 136.952 48.5382C137.039 48.0672 137.083 47.5204 137.083 46.8977V40.4076C137.083 40.2559 137.075 40.1083 137.059 39.9646C137.043 39.8129 136.996 39.6772 136.916 39.5574C136.836 39.4377 136.712 39.3419 136.544 39.2701C136.385 39.1982 136.161 39.1623 135.874 39.1623H135.443V37.0309C135.547 37.0388 135.73 37.0468 135.994 37.0548C136.257 37.0548 136.548 37.0548 136.868 37.0548C137.187 37.0548 137.506 37.0548 137.826 37.0548C138.145 37.0548 138.42 37.0548 138.652 37.0548C138.78 37.0548 138.947 37.0548 139.155 37.0548C139.362 37.0548 139.59 37.0548 139.837 37.0548C140.093 37.0468 140.356 37.0428 140.628 37.0428C140.907 37.0349 141.175 37.0309 141.43 37.0309V39.1623H140.867C140.588 39.1623 140.376 39.2102 140.233 39.306C140.097 39.3938 139.997 39.5055 139.933 39.6413C139.877 39.777 139.849 39.9246 139.849 40.0843C139.849 40.236 139.849 40.3757 139.849 40.5034V46.7061C139.849 47.7359 139.734 48.6459 139.502 49.4362C139.271 50.2186 138.903 50.8771 138.4 51.412C137.906 51.9389 137.259 52.338 136.461 52.6094C135.67 52.8729 134.712 53.0046 133.587 53.0046C132.453 53.0046 131.479 52.8809 130.665 52.6334C129.859 52.3779 129.196 51.9948 128.677 51.4838C128.166 50.965 127.791 50.3183 127.552 49.544C127.312 48.7617 127.193 47.8437 127.193 46.7899V40.0843C127.193 39.9965 127.185 39.9007 127.169 39.7969C127.153 39.6852 127.109 39.5854 127.037 39.4976C126.965 39.4018 126.857 39.3219 126.714 39.2581C126.578 39.1942 126.386 39.1623 126.139 39.1623H125.624V37.0309Z"
      fill="white"
    />
    <path
      d="M145.917 37.0309C146.42 37.0388 146.835 37.0428 147.162 37.0428C147.498 37.0428 147.801 37.0428 148.072 37.0428C148.344 37.0428 148.619 37.0428 148.899 37.0428C149.178 37.0428 149.517 37.0428 149.916 37.0428C150.14 37.0508 150.427 37.0548 150.779 37.0548C151.138 37.0548 151.513 37.0548 151.904 37.0548C152.295 37.0548 152.682 37.0508 153.066 37.0428C153.449 37.0349 153.784 37.0309 154.072 37.0309V39.1623H153.557C153.237 39.1623 152.99 39.1783 152.814 39.2102C152.639 39.2421 152.551 39.3299 152.551 39.4736C152.551 39.5375 152.619 39.6572 152.754 39.8328C152.898 40.0005 153.058 40.1761 153.233 40.3597L155.556 42.8983C155.556 42.8983 155.6 42.8424 155.688 42.7306C155.784 42.6189 155.904 42.4792 156.047 42.3115C156.199 42.1359 156.363 41.9443 156.538 41.7368C156.722 41.5292 156.897 41.3256 157.065 41.1261C157.233 40.9185 157.384 40.7309 157.52 40.5633C157.664 40.3877 157.768 40.2519 157.831 40.1562C157.991 39.9566 158.127 39.8009 158.239 39.6892C158.35 39.5774 158.406 39.5055 158.406 39.4736C158.406 39.3379 158.27 39.2581 157.999 39.2341C157.736 39.2022 157.344 39.1783 156.826 39.1623V37.0309C157.145 37.0309 157.476 37.0349 157.819 37.0428C158.171 37.0508 158.51 37.0588 158.837 37.0668C159.173 37.0668 159.488 37.0668 159.783 37.0668C160.079 37.0668 160.334 37.0628 160.55 37.0548C161.164 37.0548 161.775 37.0548 162.382 37.0548C162.988 37.0548 163.655 37.0468 164.381 37.0309L164.357 38.9707C164.022 38.9707 163.727 38.9787 163.471 38.9946C163.216 39.0106 162.988 39.0425 162.789 39.0904C162.589 39.1383 162.41 39.2102 162.25 39.306C162.098 39.4018 161.959 39.5335 161.831 39.7011C161.815 39.7091 161.743 39.7849 161.615 39.9286C161.488 40.0723 161.32 40.2599 161.112 40.4914C160.905 40.715 160.673 40.9704 160.418 41.2578C160.162 41.5372 159.899 41.8286 159.628 42.1319C159.356 42.4273 159.093 42.7147 158.837 42.9941C158.582 43.2735 158.354 43.5249 158.155 43.7484C157.955 43.972 157.796 44.1516 157.676 44.2873L157.496 44.4789L161.675 48.9453C161.923 49.2247 162.146 49.4682 162.346 49.6757C162.545 49.8753 162.757 50.0429 162.98 50.1786C163.204 50.3144 163.455 50.4141 163.735 50.478C164.014 50.5419 164.357 50.5738 164.765 50.5738V52.6933C164.11 52.6853 163.459 52.6773 162.813 52.6693C162.174 52.6613 161.484 52.6573 160.741 52.6573C159.911 52.6573 159.129 52.6613 158.394 52.6693C157.668 52.6773 156.933 52.6853 156.191 52.6933C156.191 52.334 156.187 51.9828 156.179 51.6395C156.179 51.2883 156.179 50.933 156.179 50.5738C156.674 50.5738 157.073 50.5499 157.376 50.502C157.688 50.4541 157.843 50.3383 157.843 50.1547C157.843 50.1148 157.815 50.0549 157.76 49.9751C157.704 49.8873 157.632 49.7915 157.544 49.6877C157.464 49.5759 157.372 49.4602 157.269 49.3404C157.165 49.2207 157.061 49.101 156.957 48.9812L154.886 46.5025L152.682 49.0291C152.387 49.3484 152.18 49.5999 152.06 49.7835C151.94 49.9671 151.88 50.1028 151.88 50.1906C151.88 50.2864 151.92 50.3623 152 50.4181C152.088 50.466 152.208 50.502 152.359 50.5259C152.511 50.5499 152.69 50.5658 152.898 50.5738C153.106 50.5738 153.333 50.5738 153.581 50.5738V52.6933C152.671 52.6933 151.84 52.6893 151.09 52.6813C150.34 52.6733 149.713 52.6693 149.21 52.6693C149.002 52.6693 148.795 52.6693 148.587 52.6693C148.388 52.6693 148.16 52.6733 147.905 52.6813C147.649 52.6813 147.354 52.6853 147.019 52.6933C146.683 52.6933 146.276 52.6933 145.797 52.6933V50.5618C146.109 50.5618 146.372 50.5499 146.588 50.5259C146.811 50.502 147.027 50.4461 147.234 50.3583C147.45 50.2704 147.669 50.1347 147.893 49.9511C148.124 49.7675 148.4 49.5201 148.719 49.2087L152.802 44.9579L148.815 40.6351C148.48 40.2759 148.204 40.0005 147.989 39.8089C147.773 39.6093 147.569 39.4656 147.378 39.3778C147.186 39.282 146.979 39.2261 146.755 39.2102C146.54 39.1862 146.26 39.1703 145.917 39.1623V37.0309Z"
      fill="white"
    />
    <path
      d="M135.993 84.8943C135.317 84.8943 134.688 84.7675 134.105 84.514C133.523 84.2511 133.011 83.8896 132.57 83.4295C132.129 82.9694 131.781 82.4388 131.528 81.8379C131.284 81.237 131.162 80.5984 131.162 79.9224C131.162 79.2275 131.284 78.5796 131.528 77.9787C131.781 77.3683 132.129 76.8284 132.57 76.3589C133.011 75.8895 133.523 75.5232 134.105 75.2603C134.688 74.9974 135.317 74.866 135.993 74.866C136.669 74.866 137.298 74.9974 137.88 75.2603C138.462 75.5232 138.969 75.8895 139.401 76.3589C139.843 76.819 140.185 77.3543 140.429 77.9646C140.683 78.5749 140.81 79.2275 140.81 79.9224C140.81 80.5609 140.702 81.1618 140.486 81.7252C140.279 82.2792 139.988 82.7816 139.613 83.2323C139.8 83.3074 139.988 83.3544 140.176 83.3731C140.373 83.3919 140.566 83.3919 140.753 83.3731V84.9506C140.275 84.96 139.875 84.9553 139.556 84.9365C139.237 84.9271 138.965 84.8802 138.739 84.7957C138.523 84.7112 138.317 84.5797 138.12 84.4013C137.443 84.73 136.735 84.8943 135.993 84.8943ZM135.993 83.2041C136.425 83.2041 136.838 83.1102 137.232 82.9224C137.129 82.7065 137.016 82.5421 136.894 82.4295C136.781 82.3074 136.631 82.2135 136.443 82.1478C136.265 82.0726 136.03 82.0022 135.739 81.9365V80.1055C136.35 80.1994 136.918 80.3637 137.443 80.5984C137.979 80.8332 138.368 81.1712 138.613 81.6125C138.744 81.3684 138.847 81.1055 138.922 80.8238C138.997 80.5327 139.035 80.2322 139.035 79.9224C139.035 79.3214 138.899 78.7674 138.627 78.2604C138.364 77.7533 138.002 77.3449 137.542 77.035C137.082 76.7251 136.566 76.5702 135.993 76.5702C135.411 76.5702 134.889 76.7298 134.429 77.0491C133.969 77.359 133.603 77.7721 133.331 78.2885C133.068 78.7956 132.936 79.3402 132.936 79.9224C132.936 80.4952 133.068 81.0304 133.331 81.528C133.603 82.0257 133.969 82.4295 134.429 82.7393C134.899 83.0492 135.42 83.2041 135.993 83.2041Z"
      fill="#3A1078"
    />
    <path
      d="M142.241 84.8943C142.044 84.8849 141.871 84.8098 141.72 84.6689C141.579 84.5281 141.509 84.3591 141.509 84.1619C141.509 83.9553 141.579 83.7816 141.72 83.6407C141.871 83.4999 142.044 83.4295 142.241 83.4295C142.439 83.4295 142.608 83.4999 142.748 83.6407C142.889 83.7816 142.964 83.9553 142.974 84.1619C142.974 84.3591 142.899 84.5328 142.748 84.683C142.608 84.8239 142.439 84.8943 142.241 84.8943Z"
      fill="#3A1078"
    />
    <path
      d="M152.64 84.9553H151.881V80.3575H146.045V84.9553H145.287V74.866H146.045V79.7809H151.881V74.866H152.64V84.9553Z"
      fill="#1F316F"
    />
    <path
      d="M161.43 84.9553H160.525L157.71 80.5016H155.58V84.9553H154.821L154.836 74.866H158.775C159.222 74.866 159.63 74.9957 160 75.2551C160.379 75.5146 160.686 75.8605 160.919 76.2929C161.153 76.7157 161.269 77.1817 161.269 77.691C161.269 78.1522 161.153 78.599 160.919 79.0314C160.686 79.4638 160.365 79.8194 159.956 80.098C159.558 80.3671 159.11 80.5016 158.614 80.5016L161.43 84.9553ZM160.511 77.691C160.511 77.3355 160.438 76.9991 160.292 76.682C160.146 76.3649 159.942 76.1103 159.679 75.9181C159.416 75.7163 159.115 75.6155 158.775 75.6155H155.58V79.7665H158.731C159.052 79.7665 159.344 79.656 159.606 79.435C159.878 79.214 160.097 78.9449 160.263 78.6278C160.428 78.3011 160.511 77.9889 160.511 77.691Z"
      fill="#1F316F"
    />
    <path
      d="M175.453 19.6247H173.765C173.068 16.0068 169.999 9.41186 166.218 9.41186H53.0975L45.8638 0.627395C45.556 0.156803 45.0943 0 44.6325 0H10.7733C7.38747 0 4.61717 2.82356 4.61717 6.27451V19.8247C1.96969 20.5258 0 22.9894 0 25.8994V63.5468C0 66.9977 2.7703 69.8213 6.15617 69.8213H175.452C178.838 69.8213 181.608 66.9977 181.608 63.5468V25.8994C181.609 22.4482 178.838 19.6247 175.453 19.6247ZM7.69535 6.27451C7.69535 4.54894 9.0805 3.13716 10.7735 3.13716H43.8631L51.0968 11.9216C51.4046 12.3922 51.8663 12.549 52.3281 12.549H166.218C168.219 12.549 169.912 17.7423 170.527 19.6247L7.69535 19.6247V6.27451ZM178.531 63.5468C178.531 65.2723 177.145 66.6841 175.452 66.6841H6.15617C4.46315 66.6841 3.07799 65.2723 3.07799 63.5468V25.8994C3.07799 24.1738 4.46315 22.762 6.15617 22.762H175.453C177.146 22.762 178.531 24.1738 178.531 25.8994L178.531 63.5468Z"
      fill="#1F316F"
    />
  </svg>
);

export default function LoginPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="flex justify-center md:justify-start top-0 w-full p-10 absolute">
        <Link to="/" className="w-[140px]">
          <AlumnuxLogo />
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
      <div className="pb-4 text-sm">
        Having login issues ?{" "}
        <a
          className="font-semibold text-primary"
          href="mailto:support@alumnux.qrhr.com"
        >
          Email us
        </a>
      </div>
    </div>
  );
}
