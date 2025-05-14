import tinycolor from "tinycolor2";
import CssFilterConverter from 'css-filter-converter';

// color manipulation 
export const isValid = (value) => {
    return tinycolor(value).isValid();
}

export const getFormat = (value) => {
    const color = tinycolor(value);
    return color.getFormat();
}

export const convertFormat = (value, format) => {
    const color = tinycolor(value);
    if(!color.isValid()) return value;
    if(format==='hex') return color.toHexString();
    if(format==='rgb') return color.toRgbString();
    if(format==='hsl') return color.toHslString();
    if(format==='hsv') return color.toHsvString();
    if(format==='name') return color.toName();
    return value;
}

export const getNextMode = (curMode) => {
    let nextMode = 'hex';
    if(curMode==='hex') nextMode = 'rgb';
    else if(curMode==='rgb') nextMode = 'hsl';
    else if(curMode==='hsl') nextMode = 'hsv';
    else if(curMode==='hsv') nextMode = 'hex';

    return nextMode;
}

export const colorAdjustment = (value, action) => {
    if(action==='lighten') return tinycolor(value).lighten(5).toHexString(); 
    if(action==='darken') return tinycolor(value).darken(5).toHexString(); 
    if(action==='saturate') return tinycolor(value).saturate(5).toHexString(); 
    if(action==='desaturate') return tinycolor(value).desaturate(5).toHexString(); 
    if(action==='random') return tinycolor.random().toHexString();
}

export const getSimilarSwatches = (swatch) => {

    const variation1 = tinycolor(swatch).spin(10).toHexString();
    const variation2 = tinycolor(swatch).darken(10).saturate(10).spin(10).toHexString();
    const variation3 = tinycolor(swatch).lighten(10).saturate(15).spin(10).toHexString();
    const variation4 = tinycolor(swatch).desaturate(10).spin(10).toHexString();

    const variation5 = tinycolor(swatch).spin(-10).toHexString();
    const variation6 = tinycolor(swatch).spin(-10).toHexString();
    const variation7 = tinycolor(swatch).spin(-10).toHexString();
    const variation8 = tinycolor(swatch).spin(-10).toHexString();

    return [variation1, variation2, variation3, variation4, variation5, variation6, variation7, variation8];
}
// color to filter

export const convertToFilter = (value) => {
    const hexColor = tinycolor(value).toHexString();
    const result = CssFilterConverter.hexToFilter(hexColor);
    return {value:result.color, loss:result.loss}
}

export const rateConversion = (loss) => {
    loss = loss.toFixed(1)
    if(loss == 0.0) return 'perfect match';
    if(loss > 0.0 && loss < 0.50 ) return 'great match';
    if(loss >= 0.50 && loss < 1 ) return 'very good match';
    if(loss >= 1 && loss < 1.5 ) return 'good match';
    if(loss >= 1.5) return 'this is not a good match. Consider to try again the conversion';
}

// generate schemes
export const schemeTypes = ['monochromatic', 'analogous', 'triad', 'tetrad', 'splitcomplement', 'complement'];
export const generateScheme = (color, type) => {
    let colors = [];
    if(type==='monochromatic') colors = tinycolor(color).monochromatic(6).map((el) => el.toHexString());
    if(type==='analogous') colors = tinycolor(color).analogous(6).map((el) => el.toHexString());
    if(type==='triad') colors = tinycolor(color).triad().map((el) => el.toHexString());
    if(type==='tetrad') colors = tinycolor(color).tetrad().map((el) => el.toHexString());
    if(type==='splitcomplement') colors = tinycolor(color).splitcomplement().map((el) => el.toHexString());
    if(type==='complement') {
        const complementaryColor = tinycolor(color).complement().toHexString();
        colors.push(color);
        colors.push(complementaryColor);
    }
    return colors;
}

