document.addEventListener("DOMContentLoaded", () => {
    var x = 0;
    var textEffect = "I'm currently studying Computer Engineering in Chulalongkorn University in Thailand.";
    var container = document.querySelector("#typing");
    container.innerHTML = "";
    function animate(){
        if(x < textEffect.length){
            container.innerHTML += textEffect[x];
            x++;
            setTimeout(animate, 20);
        }
        else {
            const text = document.createElement("div");
            text.id = "skillz";
            text.append("Click this for my skills!");
            document.querySelector(".welcome").append(text);
            document.querySelector("#skillz").addEventListener("click", () => {
                skillrain();
            })
        }
    }
    animate();
    function skillrain(){
        document.querySelector(".section").style.opacity = `0`;
        setTimeout(() => {
            document.querySelector(".section").style.display = "none";
            temp = document.querySelector(".add");
            temp.style.display = "block";
            setTimeout(() => {
                document.querySelector(".add").style.opacity = "1";
                insideCanvas();
            },500);
        }, 2000);
    }
})
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
  
    return rotatedVelocities;
}
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
  
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;
  
    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
  
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
  
        // Store mass in var for better readability in collision equation
        const m1 = 1;
        const m2 = 1;
  
        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);
  
        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
  
        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);
  
        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
  
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
  }
const sin45 = Math.sin(0.25);

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function insideCanvas() {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    const frame = document.querySelector("body");
    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight - 140;

    class Ball {
        constructor(x, y, radius, color, velocity, letter) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.letter = letter;
        }

        draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.fillStyle = 'white';
            c.font = "20px Montserrat";
            c.fillText(this.letter,this.x-sin45*this.radius-1.5,this.y+sin45*this.radius);
        }

        update = (balls) => {
            this.draw();
            for (let i = 0; i < balls.length; i++){
                if(this === balls[i])continue;
            
                if (distance(this.x, this.y, balls[i].x, balls[i].y) < this.radius * 2){
                    resolveCollision(this, balls[i]);
                }
            }
            if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
                this.velocity.x *= -1;
                if (this.x - this.radius <= 0) this.x = this.radius;
                else this.x = canvas.width - this.radius;
              }
              if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
                this.velocity.y *= -1;
                if (this.y - this.radius <= 0) this.y = this.radius;
                else this.y = canvas.height - this.radius;
              }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.x *= 0.99;
            this.velocity.y *= 0.99;
        }
    }

    const input = document.querySelector("#dropping");
    const btn = document.querySelector("#confirm");
    let dropnow = [];
    let onScreen = [];
    input.oninput = (e) => {
        const temp = e.target.value;
        const lene = temp.length;
        dropnow = [];
        
        for(let i = 0; i < lene; i++) {
            dropnow.push(new Ball(canvas.width / 2 - (45 * lene / 2) + i * 45, 40, 20, `hsl(${Math.random() * 360},50%,50%)`, {x: 0, y: 40}, temp[i]));
        }
    }
    let animationId
    function animate() {
        animationId = requestAnimationFrame(animate);
        c.fillStyle = '#FAFAE8';
        c.fillRect(0, 0, canvas.width, canvas.height);
        dropnow.forEach( (ball) => {
            ball.draw();
        });
        onScreen.forEach( (ball) => {
            ball.update(onScreen);
        })
    }
    btn.addEventListener('click', () => {
        dropnow.forEach( (ball) => {
            onScreen.push(ball);
        })
        dropnow = [];
        input.value = "";
    })
    animate();
    const list = ["Javascript","HTML","CSS","C","C++","Python","React","SQL"]
    let x = 0;
    function play(){
        if(x < list.length){
            let lene = list[x].length;
            for (let i = 0; i < lene; i++){
                onScreen.push(
                    new Ball(
                        canvas.width / 2 - (45 * lene / 2) + i * 45,
                         40, 
                         20, 
                         `hsl(${Math.random() * 360},50%,50%)`, 
                         {x: 0, y: 10}, 
                         list[x][i]
                    )
                );
            }
            x++;
            setTimeout(play, 1000);
        }
    }
    play();
}
