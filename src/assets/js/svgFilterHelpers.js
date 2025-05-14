//************** SVG FILTER ***************//
import CssFilterConverter from 'css-filter-converter';
import { TinyColor } from '@ctrl/tinycolor';

export const displayMatchMessage = (loss) => {
    const lossValue = loss.toFixed(1);
    if (lossValue ==  0.0) return {value:'perfect', text: 'perfect match!', appendix:''};
    else if (lossValue > 0.0 && lossValue < 0.3) return {value:'great', text: 'great match!', appendix:''};
    else if (lossValue >= 0.3 && lossValue < 0.5) return {value:'good', text: 'good match.', appendix:''};
    else if (lossValue >= 0.5 && lossValue < 1) return {value:'decent', text: 'decent match.', appendix:'Maybe you should try again'};
    else if(lossValue >= 1) return {value:'bad', text: 'not a good match!', appendix:'Try to convert the color again.'};
}

export const convertToFilter = (value) => {
    const color = new TinyColor(value);
    const conversion = getBestFilterResult(color.toHexString());
    const opacity = getOpacityPercentage(color.getAlpha());
    return {filter:conversion.filter.concat(` opacity(${opacity}%)`), loss:conversion.loss} 
}

function getBestFilterResult(color) {
    let loss = 10;
    let filter = '';
    for (let i = 0; i < 40; i++) {
        let tempConversion = CssFilterConverter.hexToFilter(color);
        let tempLoss = (Math.round(tempConversion.loss*10)/10);
        let tempFilter = tempConversion.color;
        if(tempLoss === 0) return {filter:tempFilter, loss:tempLoss};
        if(tempLoss < loss) {
            loss = tempLoss;
            filter = tempFilter;
        }
    }
    return {filter:filter, loss:loss};
}

function getOpacityPercentage(alpha) {
    return Math.round(alpha * 100); 
}