import { TinyColor } from '@ctrl/tinycolor';
import { random } from '@ctrl/tinycolor';


export const getBrightness = (value) => {return new TinyColor(value).getBrightness();}

export const schemeTypes = ['monochromatic', 'analogous', 'polyad', 'splitcomplement', 'complement'];

export const generateScheme = (color, type, numb=3) => {
    const baseColor = new TinyColor(color);
    let colors = [];
    if(type==='monochromatic') colors = baseColor.monochromatic(numb);
    if(type==='analogous') colors = baseColor.analogous(numb);
    if(type==='polyad') colors = baseColor.polyad(numb);
    if(type==='splitcomplement') colors = baseColor.splitcomplement();
    if(type==='complement') {
        let complementaryColor;
        if(baseColor.getAlpha() < 1) complementaryColor = baseColor.complement().toHex8String();
        else complementaryColor = baseColor.complement().toHexString();
        colors.push(color);
        colors.push(complementaryColor);
        return colors;
    }
    if(baseColor.getAlpha() < 1) {
        const alpha = baseColor.getAlpha();
        colors = colors.map(el => el.setAlpha(alpha)).map((el) => el.toHex8String());
    } else colors = colors.map((el) => el.toHexString());
    
    return colors;
}
export const getNextFormat = (curFormat) => {
    const formats = ['hex', 'rgb', 'hsl', 'hsv'];
    let format = curFormat.toLowerCase();
    if(format==='hex8') format = 'hex';
    const index = formats.indexOf(format);
    let newIndex;
    index === formats.length-1 ? newIndex = 0 : newIndex = index+1;
    return formats[newIndex];
}
export const convertFormat = (value, format) => {
    const color = new TinyColor(value);
    if(!color.isValid) return 'not valid';
    else if(format==='hex' && color.getAlpha() < 1) return color.toHex8String();
    else if(format==='hex' && color.getAlpha() === 1) return color.toHexString();
    else if(format==='hex8') return color.toHex8String();
    if(format==='rgb') return color.toRgbString();
    else if(format==='hsl') return color.toHslString();
    else if(format==='hsv') return color.toHsvString();
    else if(format==='name') return color.toName();
}

export const colorAdjustment = (value, action) => {
    if(action==='lighten') return new TinyColor(value).lighten(4).toHex8String(); 
    if(action==='darken') return new TinyColor(value).darken(4).toHex8String(); 
    if(action==='saturate') return new TinyColor(value).saturate(4).toHex8String(); 
    if(action==='desaturate') return new TinyColor(value).desaturate(4).toHex8String(); 
    if(action==='random') return new TinyColor(random()).toHex8String();
}

export const isValidColor = (value) => new TinyColor(value).isValid;

export const getFormat = (value) => new TinyColor(value).format;

export const getFormatLabel = (value) => {
    const color = new TinyColor(value)
    const format = color.format;
    if(format==='rgb') {
        if(color.getAlpha() < 1) return 'rgba';
        else return 'rgb';
    }
    else if(format==='hsv') {
        if(color.getAlpha() < 1) return 'hsva';
        else return 'hsv';
    }
    else if(format==='hsl') {
        if(color.getAlpha() < 1) return 'hsla';
        else return 'hsl';
    }

    return format;
}

export const areColorsEquals = (value1, value2) => {
    
    let color1 = new TinyColor(value1);
    let color2 = new TinyColor(value2);
    
    return color1.equals(color2); 
}

export const getSimilarSwatches = (swatch, type) => {

    let spinValue = 4;
    let variance = 8;
    let varianceTwo = 0;

    if(type==='monochromatic') {
        spinValue = 4.5
        varianceTwo = 5;
    }
    if(type==='analogous') {
        spinValue = 8;
        varianceTwo = 8;
    }
    if(type==='splitcomplement') {
        spinValue = 6.5;
        varianceTwo = 6;
    }
    if(type==='complement') spinValue = 10;
    if(type==='polyad') variance = 16;

  
    const variation1 = new TinyColor(swatch).spin(spinValue).lighten(variance).desaturate(variance).toHexString();
    const variation2 = new TinyColor(swatch).spin(spinValue*2).darken(variance).saturate(variance).toHexString();
    const variation3 = new TinyColor(swatch).spin(spinValue*3).lighten(varianceTwo).saturate(varianceTwo).toHexString();
    const variation4 = new TinyColor(swatch).spin(spinValue*4).darken(varianceTwo).desaturate(varianceTwo).toHexString();

    const variation5 = new TinyColor(swatch).spin(-spinValue).lighten(variance).desaturate(variance).toHexString();
    const variation6 = new TinyColor(swatch).spin(-spinValue*2).darken(variance).saturate(variance).toHexString();
    const variation7 = new TinyColor(swatch).spin(-spinValue*3).lighten(varianceTwo).saturate(varianceTwo).toHexString();
    const variation8 = new TinyColor(swatch).spin(-spinValue*4).darken(varianceTwo).desaturate(varianceTwo).toHexString();

    return [variation1, variation2, variation3, variation4, variation5, variation6, variation7, variation8];

}

