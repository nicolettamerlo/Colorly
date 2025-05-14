import githubIcon  from "../assets/images/icons/github.svg";
import codepenIcon  from "../assets/images/icons/codepen.svg";
import linkedinIcon from "../assets/images/icons/linkedin.svg"
import websiteIcon from "../assets/images/icons/website.svg"

export const githubLink = 'https://github.com/nicolettamerlo';
export const websiteLink = 'https://nicolettamerlo.com/';
export const codepenLink = 'https://codepen.io/nicolettamerlo';
export const linkedinLink = 'https://www.linkedin.com/in/nicoletta-merlo-205051a4/';

export const contactLinks = [
    {url:githubLink, icon:githubIcon, alt:'github'},
    {url:websiteLink, icon:websiteIcon, alt:'website'},
    {url:linkedinLink, icon:linkedinIcon, alt:'linkedin'},
    {url:codepenLink, icon:codepenIcon, alt:'codepen'},
]

export const menuLinks = [
    {url:"/schemes-generator", key:"Color Scheme Generator"},
    {url:"/svg-filter-converter", key:"Svg Filter Converter"},
    {url:"/color-format-converter", key:"Color Format Converter"}
]