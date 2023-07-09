export default function Text(props) {
    return (
        <div className="text">
        {props.timeDirection === 1 ?
            <h1>Coming soon</h1>
            :
            props.timeDirection === -1 ?
                <h1>Have passed</h1>
                :
                <h1>Time is up</h1>
        }

        <p>
            A timer that you can use in everyday life for better time management
            <br />
            He can count days in both directions
        </p>
        </div>
    );
}
  