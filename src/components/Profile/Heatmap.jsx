import React from 'react';
import HeatMap from '@uiw/react-heat-map';

const HeatmapComp = () => {
    const value = [
        { date: '2016/01/11', count: 2 },
        ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx })),
        ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx })),
        { date: '2016/04/12', count: 2 },
        { date: '2016/05/01', count: 5 },
        { date: '2016/05/02', count: 5 },
        { date: '2016/05/03', count: 1 },
        { date: '2016/05/04', count: 11 },
        { date: '2016/05/08', count: 32 },
    ];

    return (
        <div className='glassmorphism rounded-lg h-48 p-4 overflow-hidden'>
            <h3 className='text-lg font-semibold'>User Activity Map</h3>
            <div className='heatmap-scroll-container overflow-x-auto'>
                <HeatMap
                    value={value}
                    width={'700px'} 
                    style={{ '--rhm-rect': '#f0f0f0', '--rhm-text': '#fff',color: '#fff', fontSize: '10px' }}
                    startDate={new Date('2016/01/01')}
                    endDate={new Date('2016/12/31')}
                    panelColors={{
                        2: '#e0f2f1',
                        4: '#b9e3c6',
                        8: '#8ecb8c',
                        16: '#5ab85e',
                        32: '#3d8c43',
                        64: '#2e6e32',
                        128: '#1e4d23',
                        256: '#134d1b',
                        512: '#003300',
                    }}
                    legendRender={(props) => <rect {...props} y={props.y + 10} rx={2} />}
                    rectProps={{
                        rx: 2
                    }}
                />
            </div>
        </div>
    );
}

export default HeatmapComp;
