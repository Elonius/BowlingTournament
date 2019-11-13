const SPARE_CHAR = "/";
const STRIKE_CHAR = "X";
const BALL_SEPARATOR_CHAR = " ";

window.onload = function () {
    document.querySelector("#randomGameButton").addEventListener("click", generateGame);
    document.querySelector("#keepResultsInput").checked = true;
};

function generateGame() {
    let strikeFrames = +document.querySelector("input[name='strikes']").value;
    let spareFrames = +document.querySelector("input[name='spares']").value;;
    let openFrames = +document.querySelector("input[name='openFrames']").value;
    let frames = generateFrames(strikeFrames, spareFrames, openFrames);
    parseFrames(frames);
    let balls = getBalls(frames);
    let framesTable = formatFramesAsTable(frames);

    let result = "<div class='result'>";
    result += "<p>Balls: " + balls + "</p>";
    result += "<p>Frames: </p>" + framesTable;
    result += "</div>";

    let resultsContainer = document.querySelector("#resultsContainer");
    let keepPrevious = document.querySelector("#keepResultsInput").checked;
    if (!keepPrevious) {
        resultsContainer.innerHTML = "";
    }
    resultsContainer.innerHTML = result + resultsContainer.innerHTML;
}

function generateFrames(strikes, spares, openFrames) {

    if (strikes < 0 || spares < 0 || openFrames < 0 || (strikes + spares + openFrames) !== 10) {
        return ["0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0"];
    }
    let frames = [];
    let ball1, ball2, bonus;
    let i;

    // generate the requested number of frames of each type
    for (i = 0; i < strikes; i++) {
        frames.push(STRIKE_CHAR);
    }
    for (i = 0; i < spares; i++) {
        ball1 = generateRandomBetween(0, 9);
        frames.push(ball1 + BALL_SEPARATOR_CHAR + SPARE_CHAR);
    }
    for (i = 0; i < openFrames; i++) {
        ball1 = generateRandomBetween(0, 9);
        ball2 = generateRandomBetween(0, 9 - ball1);
        frames.push(ball1 + BALL_SEPARATOR_CHAR + ball2);
    }

    // shuffle the frames
    shuffle(frames);

    // generate one bonus ball if the tenth frame is a spare
    if (frames[9].indexOf(SPARE_CHAR) !== -1) {
        bonus = generateRandomBall();
        frames.push(bonus);
    }

    // generate two bonus balls if the tenth frame is a strike
    if (frames[9] === STRIKE_CHAR) {
        ball1 = generateRandomBall();
        if (ball1 === STRIKE_CHAR) {
            bonus = ball1 + BALL_SEPARATOR_CHAR + generateRandomBall();
        } else {
            ball2 = generateRandomBetween(0, 10 - ball1); // might be a spare
            if (ball1 + ball2 === 10) {
                ball2 = SPARE_CHAR;
            }
            bonus = ball1 + BALL_SEPARATOR_CHAR + ball2;
        }
        frames.push(bonus);
    }

    console.log(frames);
    return frames;
}

// generate a strike half the time 
function generateRandomBall() {
    let res = "";
    if (Math.random() < 0.5) {
        res = STRIKE_CHAR;
    } else {
        res = generateRandomBetween(0, 9);
    }
    return res;
}

function generateRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// The Fisher-Yates Shuffle 
function shuffle(frames) {
    for (let i = frames.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = frames[i];
        frames[i] = frames[j];
        frames[j] = temp;
    }
}

function getBalls(frames) {
    let res = frames[0];

    for (let i = 1; i < frames.length; i++) {
        res += BALL_SEPARATOR_CHAR + frames[i];
    }

    return res;
}

function formatFramesAsTable(frames) {
    let i;
    let res = "<table>";
    res += "<tr>";
    for (i = 0; i < frames.length; i++) {
        if (i < 10) {
            res += "<th>" + (i + 1) + "</th>";
        } else {
            res += "<th>Bonus</th>";
        }
    }
    res += "</tr>";

    res += "<tr>";
    for (i = 0; i < frames.length; i++) {
        res += "<td>" + frames[i] + "</td>";
    }
    res += "</tr>";

    res += "</table>";

    return res;
}



function scoreChecker(firstThrow, secondThrow) {

    //checking if the value of the current frame is 10
    if (firstThrow === "X" && secondThrow === "X") {
        return 20;
    }
    if (firstThrow === "X" && secondThrow !== undefined) {
        return 10 + parseInt(secondThrow);
    }
    if (firstThrow === "X" || secondThrow === "/") {
        return 10;
    }
    //if second throw doesn't exist
    if (secondThrow === undefined) {
        return parseInt(firstThrow)
    }
    return parseInt(firstThrow) + parseInt(secondThrow);
}


function lookAheadTwoBalls(framesArr, index) {

    let nextBall = framesArr[index + 1].split(" ")[0];
    let finalBall = framesArr[index + 1].split(" ")[1];
    if (nextBall === "X" && index < 10) {
        finalBall = framesArr[index + 2].split(" ")[0];
    }
    if (finalBall === "/") {
        return 10;
    }
    return scoreChecker(nextBall, finalBall);
}


function lookAheadOneBall(framesArr, index) {
    let nextBall = framesArr[index + 1].split(" ")[0];
    return scoreChecker(nextBall);
}

function parseFrames(frames) {

    let scoreArr = [];
    //loop
    for (let i = 0; i < frames.length; i++) {
        //store frame score
        let frameScore = 0;
        //get current ball
        const currentFrame = frames[i];
        const firstThrowFirstFrame = currentFrame.split(" ")[0];
        const secondThrowFirstFrame = currentFrame.split(" ")[1];

        if (firstThrowFirstFrame === "X" && i < 10) {
            //get score for the next two frames
            frameScore += 10 + lookAheadTwoBalls(frames, i);
        } else if (secondThrowFirstFrame === "/") {
            frameScore += 10 + lookAheadOneBall(frames, i);
        } else {
            frameScore += scoreChecker(firstThrowFirstFrame, secondThrowFirstFrame);
        }
        scoreArr[i] = frameScore;
    }
    console.log(scoreArr.slice(0, 9));
    return scoreArr.slice(0, 10);
}


// //last thing to fix is score displaying NaN when bonus balls are both strikes 
// function parseFrames(frames) {
//     //frames will be an array
//     //format:
//     //["9 0", "4 /", "3 6", "4 4", "8 /", "0 5", "1 7", "2 /", "X", "0 2"]


//     let totalScore = [];
//     //loop through frames
//     for (let i = 0; i < frames.length; i++) {
//         if (i !== 10) {
//             //there are 3 possible results for each frame
//             //-Open Frame – the number of pins knocked down after both balls is less than 10.
//             //-Spare – all ten pins are knocked down after two balls, some on the first ball and the remaining pins on the second. oIf a spare occurs in the tenth frame, the player is allowed one bonus ball.
//             //-Strike – all ten pins are knocked down on the first ball. The second ball is not rolled. 
//             //-If a strike occurs in the tenth frame, the player is allowed two bonus balls
//             let currFrame = frames[i];

//             let frameScore = 0;
//             //strike check
//             if (currFrame !== "X") {
//                 let ballOne = currFrame.split(" ")[0];
//                 let ballTwo = currFrame.split(" ")[1];




//                 //check for slash
//                 if (ballTwo !== "/") {
//                     frameScore += +ballOne;
//                     frameScore += +ballTwo;
//                 } else {
//                     //frame had a spare, add the next ball to frameScore
//                     frameScore += 10;

//                     let nextFrame = frames[i + 1];
//                     let nextBall = nextFrame.split(" ")[0];
//                     if (nextBall === "X") {
//                         frameScore += 10;
//                     } else {
//                         frameScore += +nextBall;
//                     }

//                 }
//             }
//             //score was a strike
//             else {
//                 frameScore += 10;
//                 //add the next 2 ball scores to frameScore

//                 let stringFrame = frames[i + 1];
//                 let bonusFrame = stringFrame.split(" ");
//                 //check that two balls were thrown in the next frame
//                 if (bonusFrame[0] !== "X") {

//                     let bonusBallOne = bonusFrame[0];
//                     let bonusBallTwo = bonusFrame[1];
//                     //check for a spare
//                     if (bonusBallTwo === "/") {
//                         frameScore += 10;
//                     } else {
//                         frameScore += +bonusBallOne;
//                         frameScore += +bonusBallTwo;

//                     }


//                 } else {


//                     //bonus ball one was X
//                     frameScore += 10;

//                     //get first ball from frame i+2
//                     let bonusFrameTwo = frames[i + 1];
//                     let finalBallOne = bonusFrameTwo.split(" ")[0];
//                     let finalBallTwo = bonusFrameTwo.split(" ")[1];

//                     if (finalBallOne === "X") {
//                         frameScore += 10;
//                     } else {
//                         frameScore += finalBallOne;
//                     }

//                     //if finalBallTwo not null
//                     if (finalBallTwo !== undefined) {
//                         if (finalBallTwo === "/") {
//                             frameScore += 10;
//                         } else {
//                             frameScore -= 10;
//                             if (finalBallTwo === "X") {
//                                 frameScore += 10;
//                             } else {
//                                 frameScore += +finalBallTwo;

//                             }

//                         }
//                     }

//                 }

//                 totalScore[i] = frameScore;
//             }
//         }

//         console.log(totalScore);


//     }
// }