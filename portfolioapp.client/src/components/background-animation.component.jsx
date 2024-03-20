export default function BackgroundAnimationComponent() {

    function getRandomAnimationDelay() {
        var maxDelay = 9999;
        return (Math.random() * maxDelay).toFixed(0).toString() + "ms";
    }

    function getRandomXPosition() {
        let viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return (Math.random() * viewWidth).toFixed(0).toString() + "px";
    }

    function getRandomYPosition() {
        let viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return ((Math.random() * viewHeight) + 100).toFixed(0).toString() + "px";
    }

    const stars = [];
    for (let i = 0; i < 20; i++) {
        stars.push(<div id={"star" + i} className="shooting_star" style={{ top: getRandomYPosition(), left: getRandomXPosition(), animationDelay: getRandomAnimationDelay() }}></div>);
    }

    const content =
        <div className="star-container">
            {stars}
        </div>;

    return content
}