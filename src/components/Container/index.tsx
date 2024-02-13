export default function Container(
    props: {data: ICurrentProps[]}
){
    if(!props.data?.length){
        return(
            <div>
                <h1>
                    Check the weather updates
                </h1>
            </div>
        )
    }
    return(
        <>
        {
            props.data && props.data.map(({
                lastUpdated,
                temperature,
                weather,
                windSpeed,
            }: ICurrentProps, index: number | string
            ) => {
                return(
                    <div className="flex flex-col" key={index} style={{margin: '10px'}}>
                        <div className="flex flex-col md:flex-row items-start justify-start md:justify-between space-y-4 md:space-y-0 md:space-x-8 p-4">
                            <div className="text-left"><span className="block mb-1 font-bold text-blue-500">Date: </span> {lastUpdated}</div>
                            <div><span className="block mb-1 font-bold text-blue-500">Temperature: </span>{temperature}</div>
                            <div><span className="block mb-1 font-bold text-blue-500">Wind Speed: </span>{windSpeed}</div>
                        </div>
                        
                        
                        
                        <hr className="my-8 border-5 border-red-300" />

                    </div>
                )
            })
        }


        </>
    )
}