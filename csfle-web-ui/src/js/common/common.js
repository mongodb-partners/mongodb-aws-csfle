import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHome, faKey, faDollarSign, faPoundSign, faRupeeSign, faHandshake, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(far, fab, faFacebookF, faGoogle, faHome, faKey, faDollarSign, faPoundSign, faRupeeSign, faHandshake, faThumbsUp);

export const ruler = (measure) => {
    let ruler = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    if(measure) {
        let s = measure.split(' ');
        if(s.length === 1) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[0]), bottom: parseInt(s[0]), left: parseInt(s[0])};
        } else if(s.length === 2) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[0]), left: parseInt(s[1])};
        } else if(s.length === 3) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[2]), left: parseInt(s[1])};
        } else if(s.length === 4) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[2]), left: parseInt(s[3])};
        }
    }

    return ruler;
};

export const dateFormatToString = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
        '-',
        (mm > 9 ? '' : '0') + mm,
        '-',
        (dd > 9 ? '' : '0') + dd
    ].join('');
};


