const generateOtp = () => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * 9);
    otp += num;
  }
  return otp;
};

const otpHTML = (otp) => {
  return ` <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>EMail</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <div
        style="
            width:100%;
            display:flex;
            justify-content:center;
            text-align:center;
            font-family: Outfit, sans-serif;"
      >
        <div
          style="
            width: 390px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
            margin:auto;"
        >
          <div style="line-height: 10px;">
            <img
              style="width: 280px; padding-block: 20px;"
              src="https://stories.freepiklabs.com/api/vectors/enter-otp/pana/render?color=1976D2FF&background=complete&hide="
              alt=""
            />
            <h1>One Time Password</h1>
            <p style="font-size: 16px; margin-bottom: 10px">
              Use this OTP to Reset your Password
            </p>
          </div>
          <div>
            <h2 style="letter-spacing: 18px; text-align: center; font-size: 30px;">
              &nbsp;${otp}
            </h2>
            <p
              style="
                font-size: 14px;
                font-weight: 550;
                color: #1976d2;
                text-align: center;
                margin-bottom: 0px;"
            >
              Valid for 05 Minutes Only
            </p>
          </div>
          <div>
            <p
              style="
                    font-size: 13px;
                    color: rgba(109, 107, 107, 0.954);
                    margin-bottom: -8px;
                  "
            >
              Do not share this OTP with anyone.
            </p>
            <p
              style="
                    font-size: 13px;
                    color: rgba(109, 107, 107, 0.954);
                    margin-bottom: 8px;
                  "
            >
              if you don't request this OTP, you can safely ignore it.
            </p>
            <p
              style="
                    font-size: 13px;
                    color: rgba(109, 107, 107, 0.954);
                    margin-bottom: -12px;
                  "
            >
              Thank You
            </p>
            <p
              style="
                    font-size: 14px;
                    color: #1976d2;
                    font-weight: 500;
                  "
            >
              ClassCompass
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};

function isOtpExpired(sentDate) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - sentDate.getTime();
  const minutesDifference = timeDifference / (1000 * 60); // Convert milliseconds to minutes

  // Check if the difference is greater than 5 minutes
  return minutesDifference > 5;
}

module.exports = { generateOtp, otpHTML, isOtpExpired };
