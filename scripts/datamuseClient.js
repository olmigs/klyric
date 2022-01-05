import ky from 'ky-universal';

const DATAMUSE_ENDPOINT = 'https://api.datamuse.com/words?';

/**
 * Sends `GET` request to Datamuse API.
 * @param {Parameter} param - A instance of Parameter.
 * @param {string} query - The input query string.
 * @param {number} [max] - Maximum results to return.
 */
async function fetch(param, query, max = -1) {
    let meta = '&md=ps';
    if (max > 0) {
        meta += '&max=' + max;
    }
    const params = param.code + query;
    const json = await ky.get(DATAMUSE_ENDPOINT + params + meta).json();
    return json;
}

class Parameter {
    static Trigger = new Parameter('rel_trg=');
    static Synonym = new Parameter('rel_syn=');
    static Adjective = new Parameter('rel_jjb=');
    static Kinda = new Parameter('rel_spc=');
    static Noun = new Parameter('rel_jja=');
    
    constructor(param) {
        this.code = param;
    }
}

export function getAdjectives(query) {
    return fetch(Parameter.Adjective, query);
}

export async function getVerbs(query) {
    // get initial trigger verbs
    let verbs = [];
    const init_trigs = await fetch(Parameter.Trigger, query);
    verbs = [...filterVerbs(init_trigs)];
    
    // get 'relateds', i.e. synonyms and kindas
    const kindas = await fetch(Parameter.Kinda, query);
    const syns = await fetch(Parameter.Synonym, query);
    const relateds = [...syns, ...kindas];
    
    // for each related, add trigger verbs to verbs
    for (let item of relateds) {
        const t = await fetch(Parameter.Trigger, item.word);
        verbs = [...verbs, ...filterVerbs(t)];
    }

    // get more verbs, if needed
    if (verbs.length < 10) {
        console.log('...standby....');
        verbs = [...verbs, ...await getVerbsUnstable(query)];
    }

    return verbs;
}

export function prettify(results) {
    for (let r of results) {
        console.log(`   ${r.word} (${r.tags.join(', ')})`);
    }
} 

async function getVerbsUnstable(query) {
    const adjs = await fetch(Parameter.Adjective, query);
    let cnt = 0;
    let nouns = [];
    for (let a of adjs) {
        if (cnt > 4) {
            break;
        }
        const n = await fetch(Parameter.Noun, a.word, 5);
        if (nouns.length === 0) {
            nouns = n;
        } else {
            nouns = [...nouns, ...n];
        }
        cnt++;
    }
    let verbs = [];
    for (let n of nouns) {
        const t = await fetch(Parameter.Trigger, n.word);
        if (verbs.length === 0) {
            verbs = filterVerbs(t);
        } else {
            verbs = [...verbs, ...filterVerbs(t)];
        }
        if (verbs.length > 9) {
            break;
        }
    }
    return verbs;
}

function filterVerbs(arr) {
    let ret = [];
    arr
        .filter(x => {
            if (x.tags) {
                return (
                    x.tags.includes('v') ||
                    (!x.tags.includes('n') &&
                        !x.tags.includes('prop') &&
                        !x.tags.includes('adj') &&
                        !x.tags.includes('adv') &&
                        !x.tags.includes('n/a'))
                );
            }
        })
        .forEach(element => {
            ret.push(element);
        }
    );
    return ret;
}