
export default function Progressbar({ value, maxValue, error }) {
    const percentage = (value * 100) / maxValue;
    const width = percentage <= 0 ? `${5}%` : `${percentage}%`;
    console.log(error);

    return (
        <div className="progress-bar">
            <div
                style={{ width: width, backgroundColor: error ? "red" : "" }}
                className="filler"
            >
                <span id='percentage'>{percentage}% </span>
            </div>
        </div>
    );
}
