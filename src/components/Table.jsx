const Table = ({
    data,
    setUsersChanger,
    clientUpdater
}) => {
    const startService = (id) => {
        console.log('startService', id);
        const newState = data.map(user => {
            if (user.id === id) {
                user.serviceStarted = Date.now();
            }
            return user;
        })
        clientUpdater(newState);
        setUsersChanger(newState);
    }

    const endService = (id) => {
        console.log('endService', id);
        const newState = data.map(user => {
            if (user.id === id && user.serviceStarted) {
                user.serviceEnded = Date.now();
            }
            return user;
        })
        clientUpdater(newState);
        setUsersChanger(newState);
    }

    const convertTime = (time) => {
        const date = new Date(time);
        const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        {/* <th>Identifier</th> */}
                        <th>Arrived</th>
                        <th>Service started</th>
                        <th>Service ended</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (data?.length > 0) ? (
                            data.map((entry, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx}</td>
                                        {/* <td>{entry.id.substring(0,4)}</td> */}
                                        <td>{convertTime(entry.arrived)}</td>
                                        {
                                            !entry.serviceStarted ?
                                                (<td><button onClick={() => startService(entry.id)}>Service started</button></td>) :
                                                (<td>{convertTime(entry.serviceStarted)}</td>)
                                        }
                                        {
                                            !entry.serviceEnded ?
                                                (<td><button onClick={() => endService(entry.id)}>Service ended</button></td>) :
                                                (<td>{convertTime(entry.serviceEnded)}</td>)
                                        }
                                    </tr>
                                )
                            })
                        ) : (
                            <></>
                        )
                    }
                </tbody>
            </table>
        </>

    )
}

export default Table;