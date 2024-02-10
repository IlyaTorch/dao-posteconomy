import React, {useEffect, useState} from 'react';
import '../styles/SidebarPanel.css';
import { Link } from 'react-router-dom'


const SidebarPanel = () => {
  const [is_home, setIsHome] = useState(true)
  useEffect(() => {
      setIsHome(window.location.pathname === '/')
  }, []);
  return (
    <div className="left-sidebar">
      <div className={"sidebar-item " + (is_home && "active")}>
      <Link
          to={'/'}
        >
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Outline/General/Home">
            <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M14.1221 5.76493C13.2153 4.89476 11.7835 4.89476 10.8766 5.76493L6.05743 10.3892C5.93936 10.5025 5.85993 10.6501 5.83042 10.8111C5.2532 13.9588 5.21059 17.1814 5.70438 20.3433L5.82159 21.0938H8.92207V14.6237C8.92207 14.1922 9.27185 13.8425 9.70332 13.8425H15.2954C15.7269 13.8425 16.0767 14.1922 16.0767 14.6237V21.0938H19.1772L19.2944 20.3433C19.7882 17.1814 19.7455 13.9588 19.1683 10.8111C19.1388 10.6501 19.0594 10.5025 18.9413 10.3892L14.1221 5.76493ZM9.79482 4.63751C11.3062 3.18724 13.6925 3.18724 15.2039 4.63751L20.0231 9.26182C20.3779 9.60223 20.6165 10.0457 20.7052 10.5293C21.3141 13.8497 21.359 17.249 20.8381 20.5844L20.6499 21.7901C20.572 22.2887 20.1425 22.6563 19.6378 22.6563H15.2954C14.864 22.6563 14.5142 22.3066 14.5142 21.8751V15.405H10.4846V21.8751C10.4846 22.3066 10.1348 22.6563 9.70332 22.6563H5.3609C4.85623 22.6563 4.42676 22.2887 4.34889 21.7901L4.1606 20.5844C3.63971 17.249 3.68466 13.8497 4.29354 10.5293C4.38222 10.0457 4.62085 9.60223 4.97561 9.26182L9.79482 4.63751Z"
                  fill={is_home ? "#FFF" : "#828282"}/>
            </g>
        </svg>
      </Link>

      </div>
      <div className={"sidebar-item " + (!is_home && "active")}>
        <Link
          to={'/dao/create'}
        >
            <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Solid/General/Bag">
                <g id="Icon">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55283 5.68893V7.16872L5.78832 7.31114C4.54074 7.41185 3.52306 8.3512 3.32297 9.58674C3.27948 9.85526 3.23994 10.1243 3.20433 10.3936C3.18666 10.5273 3.25795 10.6567 3.37982 10.7144L3.46008 10.7524C9.11499 13.43 15.8865 13.43 21.5414 10.7524L21.6217 10.7144C21.7435 10.6567 21.8148 10.5273 21.7971 10.3937C21.7615 10.1243 21.722 9.85527 21.6785 9.58674C21.4784 8.3512 20.4607 7.41185 19.2132 7.31114L17.4487 7.16872V5.68893C17.4487 4.7866 16.7885 4.02004 15.8962 3.88618L14.6254 3.69557C13.2168 3.48429 11.7846 3.48429 10.3761 3.69557L9.10533 3.88618C8.21298 4.02004 7.55283 4.7866 7.55283 5.68893ZM14.3936 5.24079C13.1387 5.05255 11.8628 5.05255 10.6079 5.24079L9.33712 5.4314C9.20964 5.45052 9.11533 5.56003 9.11533 5.68893V7.05874C11.3704 6.92955 13.6311 6.92955 15.8862 7.05874V5.68893C15.8862 5.56003 15.7919 5.45052 15.6644 5.4314L14.3936 5.24079Z"
                      fill={!is_home ? "#FFF" : "#828282"}/>
                <path d="M21.999 12.574C21.9912 12.4281 21.8384 12.3369 21.7048 12.3961C15.9017 14.9655 9.09975 14.9655 3.2967 12.3961C3.16306 12.3369 3.01027 12.4281 3.00249 12.574C2.89648 14.5651 3.00331 16.5647 3.32297 18.5386C3.52306 19.7742 4.54073 20.7135 5.78832 20.8142L7.73823 20.9716C10.9081 21.2275 14.0934 21.2275 17.2632 20.9716L19.2132 20.8142C20.4607 20.7135 21.4784 19.7742 21.6785 18.5386C21.9982 16.5647 22.105 14.5651 21.999 12.574Z"
                      fill={!is_home ? "#FFF" : "#828282"}/>
                </g>
                </g>
            </svg>
        </Link>
      </div>
      <div className="sidebar-item">
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Outline/General/Chart-pie-alt">
        <g id="Icon">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7181 6.02999C7.91428 6.42092 4.94727 9.63505 4.94727 13.5422C4.94727 17.7131 8.32845 21.0942 12.4993 21.0942C16.4065 21.0942 19.6206 18.1272 20.0115 14.3234H12.4993C12.0679 14.3234 11.7181 13.9736 11.7181 13.5422V6.02999ZM3.38477 13.5422C3.38477 8.50831 7.4655 4.42757 12.4993 4.42757C12.9308 4.42757 13.2806 4.77735 13.2806 5.20882V12.7609H20.8327C21.2642 12.7609 21.6139 13.1107 21.6139 13.5422C21.6139 18.576 17.5332 22.6567 12.4993 22.6567C7.4655 22.6567 3.38477 18.576 3.38477 13.5422Z" fill="#828282"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1452 4.86887V9.89632H21.1726C20.5861 7.41256 18.6289 5.45535 16.1452 4.86887ZM15.6223 3.1897C19.3934 3.659 22.3825 6.64806 22.8518 10.4192C22.9228 10.9901 22.4496 11.4588 21.8743 11.4588H15.1035C14.8159 11.4588 14.5827 11.2256 14.5827 10.938V4.16715C14.5827 3.59186 15.0514 3.11866 15.6223 3.1897Z" fill="#828282"/>
        </g>
        </g>
        </svg>
      </div>


      <div className="sidebar-item">
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Outline/General/Chart-pie-alt">
        <g id="Icon">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7181 6.02999C7.91428 6.42092 4.94727 9.63505 4.94727 13.5422C4.94727 17.7131 8.32845 21.0942 12.4993 21.0942C16.4065 21.0942 19.6206 18.1272 20.0115 14.3234H12.4993C12.0679 14.3234 11.7181 13.9736 11.7181 13.5422V6.02999ZM3.38477 13.5422C3.38477 8.50831 7.4655 4.42757 12.4993 4.42757C12.9308 4.42757 13.2806 4.77735 13.2806 5.20882V12.7609H20.8327C21.2642 12.7609 21.6139 13.1107 21.6139 13.5422C21.6139 18.576 17.5332 22.6567 12.4993 22.6567C7.4655 22.6567 3.38477 18.576 3.38477 13.5422Z" fill="#828282"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1452 4.86887V9.89632H21.1726C20.5861 7.41256 18.6289 5.45535 16.1452 4.86887ZM15.6223 3.1897C19.3934 3.659 22.3825 6.64806 22.8518 10.4192C22.9228 10.9901 22.4496 11.4588 21.8743 11.4588H15.1035C14.8159 11.4588 14.5827 11.2256 14.5827 10.938V4.16715C14.5827 3.59186 15.0514 3.11866 15.6223 3.1897Z" fill="#828282"/>
        </g>
        </g>
        </svg>
      </div>


        <div className="sidebar-item">
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Outline/General/Wallet">
            <g id="Icon">
            <path d="M16.1467 12.5003C16.1467 11.6374 16.8463 10.9378 17.7092 10.9378C18.5722 10.9378 19.2717 11.6374 19.2717 12.5003C19.2717 13.3633 18.5722 14.0628 17.7092 14.0628C16.8463 14.0628 16.1467 13.3633 16.1467 12.5003Z" fill="#828282"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2939 6.95242C20.6088 5.34235 19.0948 4.18493 17.2933 3.99534L16.6142 3.92389C13.1847 3.563 9.72563 3.5868 6.30142 3.99484L5.85148 4.04846C4.11315 4.2556 2.73581 5.61374 2.50427 7.34899C2.04806 10.7681 2.04806 14.2326 2.50427 17.6517C2.73581 19.3869 4.11316 20.745 5.85148 20.9522L6.30142 21.0058C9.72563 21.4138 13.1847 21.4376 16.6142 21.0768L17.2933 21.0053C19.0948 20.8157 20.6088 19.6583 21.2939 18.0482C22.3765 17.7259 23.2027 16.7874 23.3384 15.6278C23.5814 13.5499 23.5814 11.4508 23.3384 9.37285C23.2027 8.21324 22.3765 7.27473 21.2939 6.95242ZM16.4507 5.47781C13.1371 5.12911 9.79483 5.15211 6.4863 5.54636L6.03637 5.59998C5.00636 5.72272 4.19024 6.52746 4.05304 7.55564C3.61513 10.8376 3.61513 14.1631 4.05304 17.445C4.19024 18.4732 5.00636 19.2779 6.03637 19.4007L6.48631 19.4543C9.79483 19.8485 13.1371 19.8715 16.4507 19.5228L17.1297 19.4514C18.0157 19.3582 18.7997 18.9214 19.3429 18.2732C17.7719 18.3648 16.18 18.3239 14.6277 18.1504C13.3055 18.0026 12.2361 16.9614 12.0801 15.6278C11.8371 13.5499 11.8371 11.4508 12.0801 9.37285C12.2361 8.03925 13.3055 6.99806 14.6277 6.85028C16.18 6.67679 17.7719 6.63585 19.3429 6.72746C18.7997 6.07921 18.0157 5.6425 17.1297 5.54926L16.4507 5.47781ZM20.0815 8.34896C20.0821 8.35296 20.0828 8.35696 20.0834 8.36096L20.0897 8.40147L20.2966 8.36933C20.4037 8.37993 20.5105 8.39119 20.6172 8.40311C21.2291 8.4715 21.7163 8.95498 21.7864 9.55436C22.0154 11.5117 22.0154 13.489 21.7864 15.4463C21.7163 16.0457 21.2291 16.5291 20.6172 16.5975C20.5105 16.6095 20.4036 16.6207 20.2966 16.6313L20.0897 16.5992L20.0834 16.6397C20.0828 16.6437 20.0821 16.6477 20.0815 16.6517C18.3329 16.8099 16.5396 16.7918 14.8013 16.5975C14.1894 16.5291 13.7021 16.0457 13.632 15.4463C13.4031 13.489 13.4031 11.5117 13.632 9.55436C13.7021 8.95498 14.1894 8.4715 14.8013 8.40311C16.5396 8.20882 18.3329 8.19077 20.0815 8.34896Z" fill="#828282"/>
            </g>
            </g>
        </svg>
      </div>

        <div className="sidebar-item">
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Outline/General/Pulse">
        <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M8.58364 5.07878C8.52404 4.72353 8.22929 4.45508 7.87004 4.42885C7.51079 4.40262 7.18018 4.62541 7.06961 4.96823L4.8926 11.7184H2.08398C1.65251 11.7184 1.30273 12.0682 1.30273 12.4997C1.30273 12.9312 1.65251 13.2809 2.08398 13.2809H5.46151C5.8006 13.2809 6.10097 13.0622 6.20505 12.7395L7.57291 8.4982L9.48901 19.9206C9.54939 20.2806 9.851 20.5508 10.2154 20.5714C10.5799 20.5919 10.91 20.3574 11.0105 20.0065L13.5413 11.1732L14.8745 15.8393C14.9604 16.14 15.2173 16.3605 15.5276 16.3998C15.8379 16.439 16.1416 16.2895 16.2997 16.0196L17.9042 13.2809H19.1189C19.459 14.4833 20.5644 15.3643 21.8757 15.3643C23.4577 15.3643 24.7402 14.0818 24.7402 12.4997C24.7402 10.9176 23.4577 9.63511 21.8757 9.63511C20.5644 9.63511 19.459 10.5161 19.1189 11.7184H17.4565C17.1791 11.7184 16.9226 11.8655 16.7824 12.1048L15.875 13.6536L14.2935 8.1184C14.1977 7.78311 13.8913 7.5519 13.5426 7.55178C13.1939 7.55165 12.8873 7.78263 12.7913 8.11785L10.459 16.2584L8.58364 5.07878ZM20.5736 12.4997C20.5736 11.7806 21.1565 11.1976 21.8757 11.1976C22.5948 11.1976 23.1777 11.7806 23.1777 12.4997C23.1777 13.2188 22.5948 13.8018 21.8757 13.8018C21.1565 13.8018 20.5736 13.2188 20.5736 12.4997Z" fill="#828282"/>
        </g>
        </svg>
      </div>

         <div className="sidebar-item">
        <svg className="sidebar-icon"  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Outline/Communication/Envelope">
        <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M2.92143 8.70122C2.62962 11.4126 2.64263 14.5396 3.04869 17.24C3.27338 18.7341 4.49283 19.8796 5.99811 20.0105L7.57126 20.1472C10.8515 20.4323 14.1503 20.4323 17.4306 20.1472L19.0037 20.0105C20.509 19.8796 21.7285 18.7341 21.9532 17.24C22.3592 14.5396 22.3723 11.4127 22.0804 8.70139C22.0427 8.38705 22.0003 8.07314 21.9532 7.75975C21.7285 6.2656 20.509 5.12013 19.0037 4.98928L17.4306 4.85253C14.1503 4.56739 10.8515 4.56739 7.57126 4.85253L5.9981 4.98928C4.49282 5.12013 3.27338 6.2656 3.04869 7.75975C3.00157 8.07309 2.95916 8.38694 2.92143 8.70122ZM7.70658 6.40916C10.8968 6.13184 14.1051 6.13184 17.2953 6.40916L18.8684 6.54591C19.6542 6.61422 20.2907 7.21215 20.408 7.99211C20.4202 8.0731 20.4321 8.15414 20.4436 8.23521L14.6509 11.4534C13.3138 12.1962 11.688 12.1962 10.3509 11.4534L4.55826 8.23524C4.56979 8.15416 4.58164 8.07311 4.59382 7.9921C4.71111 7.21215 5.34766 6.61422 6.13342 6.54591L7.70658 6.40916ZM20.6348 9.91642C20.8368 12.2787 20.7613 14.6587 20.408 17.0076C20.2907 17.7876 19.6542 18.3855 18.8684 18.4538L17.2953 18.5906C14.1051 18.8679 10.8968 18.8679 7.70658 18.5906L6.13342 18.4538C5.34766 18.3855 4.71111 17.7876 4.59382 17.0076C4.2406 14.6587 4.16502 12.2787 4.36707 9.91646L9.59209 12.8192C11.4011 13.8242 13.6007 13.8242 15.4097 12.8193L20.6348 9.91642Z" fill="#828282"/>
        </g>
        </svg>

      </div>

    </div>
  );
};

export default SidebarPanel;
