import HeatMap from '@uiw/react-heat-map'
export function HeatMapCard({ values }: { values: { date: string; count: number }[] }){
    return <div>
        <HeatMap value={values} 
            style={{ color: '#d4d4d8'}}
            panelColors={{
            0: '#f4decd',
            7: '#e4b293',
            14: '#d48462',
            21: '#c2533a',
            28: '#ad001d',
            35: '#6c0012'
        }} className='w-full text-gray-00'/>
    </div>
}