const lime = '#00FF00';
const limeFilter = 'brightness(0) saturate(100%) invert(56%) sepia(98%) saturate(2796%) hue-rotate(84deg) brightness(117%) contrast(126%) opacity(100%);';

const yellow = '#FFFF00';
const yellowFilter = 'brightness(0) saturate(100%) invert(84%) sepia(100%) saturate(934%) hue-rotate(358deg) brightness(101%) contrast(101%) opacity(100%);';

const magenta = '#FF00FF';
const magentaFilter = 'brightness(0) saturate(100%) invert(19%) sepia(89%) saturate(5891%) hue-rotate(298deg) brightness(121%) contrast(118%) opacity(100%)';


export const fillExample = 
`#mySvg {
    fill: #00BFFF;
}`;

export const svgHtmlImage = 
`#html file
<img src="cat.svg" id="mySvg">`;
export const filterExample = 
`// CSS file

// this is NOT working
// #mySvg {
//     filter: #00BFFF;
// }

// this is working
#mySvg {
  filter:brightness(0) saturate(100%) invert(76%) sepia(67%) saturate(5496%) hue-rotate(161deg) brightness(104%) contrast(101%) opacity(100%);;
}`;

export const fullExample = 
`#mySvg {
  //${lime}
  filter:${limeFilter}
}
#mySvg:hover {
  //${magenta}
  filter:${magentaFilter};
}
#mySvg:active {
  //${yellow}
  filter:${yellowFilter}
}
`;