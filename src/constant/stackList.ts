import {ITechStack} from './interfaces.ts';
import {DefaultStack, InitSearchedStackNames} from './initData.ts';

const SEARCH_THRESHOLD = 2;
const SEARCHED_STACK_STORAGE_NAME = 'searched_stacks';

// Fixme: 클래스 형태로 따로 구현하는게 유지보수에 좋을 것 같습니다.
// Todo: 검색 로직에 분야에 대한 가중치 추가 - 추후 데이터 분석을 통해서 넣어야 함
// 검색한 스택을 가져옵니다.
// 상단에는 유저에게 추천하는 스택을, 하단에는 그 외의 스택을 보여줍니다.
// 처음에는 시작하는 글자, 다음은 포함하는 글자, 다음은 altname에서 시작하는 문자
export function searchTechStacks(search: string) {
  const stacksString = localStorage.getItem(SEARCHED_STACK_STORAGE_NAME);
  const stackNames = stacksString ? stacksString.split(',') : InitSearchedStackNames;

  const FavoriteStacks = stackNames.map(name =>
    TechStacks.find(stack => stack.tagName === name) ?? {...DefaultStack, tagName: name});

  if (!search) {
    if (!stacksString)
      localStorage.setItem(SEARCHED_STACK_STORAGE_NAME, stackNames.join(','));

    return FavoriteStacks;
  }

  const ElseStacks = TechStacks.filter(stack => !stackNames.includes(stack.tagName));
  const AllStacks = [...FavoriteStacks, ...ElseStacks];

  // 검색어로 시작하는 스택을 찾습니다.
  const startWithStacks = AllStacks.filter(stack => stack.tagName.startsWith(search));
  if (startWithStacks.length > SEARCH_THRESHOLD)
    return startWithStacks;

  // 검색어가 포함된 스택을 찾습니다.
  const includeWithStacks = AllStacks.filter(stack => stack.tagName.includes(search));
  if (includeWithStacks.length > SEARCH_THRESHOLD)
    return includeWithStacks;

  // name 또는 altname가 검색어로 시작하는 스택을 찾습니다.
  const altStartWithStacks = AllStacks.filter(
    stack => [stack.tagName, ...stack.altnames].some(name => name.startsWith(search)));
  if (altStartWithStacks.length > SEARCH_THRESHOLD)
    return altStartWithStacks;

  // name 또는 altname에 검색어가 포함된 스택을 찾습니다.
  return AllStacks.filter(
    stack => [stack.tagName, ...stack.altnames].some(name => name.includes(search)));
}

// 검색한 스택을 저장합니다.
export function saveSelectedTechStack(stackName: string) {
  const stacksString = localStorage.getItem(SEARCHED_STACK_STORAGE_NAME);
  const stackNames = stacksString ? stacksString.split(',') : InitSearchedStackNames;

  const SaveArr = [
    stackName,
    ...stackNames.filter(name => name !== stackName)
  ].slice(0, 20);
  // console.log(SaveArr);

  localStorage.setItem(SEARCHED_STACK_STORAGE_NAME, SaveArr.join(','));
}

const TechStacks: ITechStack[] = [
  {
    tagID: 0,
    tagName: 'threedsmax',
    altnames: [
      'Autodesk 3ds Max',
      '3dsmax'
    ],
    color: '#37a5cc',
    svg: 'original'
  },
  {
    tagID: 1,
    tagName: 'aarch64',
    altnames: [
      'arm64'
    ],
    color: '#16358C',
    svg: 'original'
  },
  {
    tagID: 2,
    tagName: 'adonisjs',
    altnames: [
      'adonis'
    ],
    color: '#5A45FF',
    svg: 'original'
  },
  {
    tagID: 3,
    tagName: 'aftereffects',
    altnames: [
      'adobeaftereffects',
      'ae'
    ],
    color: '#1F0740',
    svg: 'original'
  },
  {
    tagID: 4,
    tagName: 'akka',
    altnames: [
      'akka-framework'
    ],
    color: '#15a9ce',
    svg: 'original'
  },
  {
    tagID: 5,
    tagName: 'algolia',
    altnames: [],
    color: '#003dff',
    svg: 'original'
  },
  {
    tagID: 6,
    tagName: 'alpinejs',
    altnames: [
      'Alpine'
    ],
    color: '#2d3441',
    svg: 'original'
  },
  {
    tagID: 7,
    tagName: 'amazonwebservices',
    altnames: [
      'aws'
    ],
    color: '#f90',
    svg: 'original-wordmark'
  },
  {
    tagID: 8,
    tagName: 'anaconda',
    altnames: [],
    color: '#3eb049',
    svg: 'original'
  },
  {
    tagID: 9,
    tagName: 'android',
    altnames: [],
    color: '#A4C439',
    svg: 'original'
  },
  {
    tagID: 10,
    tagName: 'androidstudio',
    altnames: [],
    color: '#4285F4',
    svg: 'original'
  },
  {
    tagID: 11,
    tagName: 'angular',
    altnames: [],
    color: '#FFFFFF',
    svg: 'original'
  },
  {
    tagID: 12,
    tagName: 'angularjs',
    altnames: [],
    color: '#c4473a',
    svg: 'original'
  },
  {
    tagID: 13,
    tagName: 'angularmaterial',
    altnames: [],
    color: '#ffa726',
    svg: 'original'
  },
  {
    tagID: 14,
    tagName: 'ansible',
    altnames: [],
    color: '#1A1918',
    svg: 'original'
  },
  {
    tagID: 15,
    tagName: 'antdesign',
    altnames: [],
    color: '#0073bb',
    svg: 'original'
  },
  {
    tagID: 16,
    tagName: 'apache',
    altnames: [
      'The Apache Software Foundation'
    ],
    color: '#cb2533',
    svg: 'original'
  },
  {
    tagID: 17,
    tagName: 'apacheairflow',
    altnames: [
      'Airflow'
    ],
    color: '#017cee',
    svg: 'original'
  },
  {
    tagID: 18,
    tagName: 'apachekafka',
    altnames: [],
    color: '#231f20',
    svg: 'original'
  },
  {
    tagID: 19,
    tagName: 'apachespark',
    altnames: [],
    color: '#e15919',
    svg: 'original'
  },
  {
    tagID: 20,
    tagName: 'apl',
    altnames: [
      'A Programming Language'
    ],
    color: '#24a148',
    svg: 'original'
  },
  {
    tagID: 21,
    tagName: 'appcelerator',
    altnames: [],
    color: '#ac162c',
    svg: 'original'
  },
  {
    tagID: 22,
    tagName: 'apple',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 23,
    tagName: 'appwrite',
    altnames: [],
    color: '#f02e65',
    svg: 'original'
  },
  {
    tagID: 24,
    tagName: 'archlinux',
    altnames: [],
    color: '#1791cf',
    svg: 'original'
  },
  {
    tagID: 25,
    tagName: 'arduino',
    altnames: [],
    color: '#00979d',
    svg: 'original'
  },
  {
    tagID: 26,
    tagName: 'argocd',
    altnames: [],
    color: '#ef7b4d',
    svg: 'original'
  },
  {
    tagID: 27,
    tagName: 'astro',
    altnames: [],
    color: '#ff5d01',
    svg: 'original'
  },
  {
    tagID: 28,
    tagName: 'atom',
    altnames: [],
    color: '#67595D',
    svg: 'original'
  },
  {
    tagID: 29,
    tagName: 'awk',
    altnames: [
      'the awk programming language'
    ],
    color: '#0a094d',
    svg: 'original-wordmark'
  },
  {
    tagID: 30,
    tagName: 'axios',
    altnames: [],
    color: '#5a29e4',
    svg: 'plain'
  },
  {
    tagID: 31,
    tagName: 'azure',
    altnames: [
      'microsoftazure'
    ],
    color: '#0089D6',
    svg: 'original'
  },
  {
    tagID: 32,
    tagName: 'azuredevops',
    altnames: [
      'azure-devops'
    ],
    color: '#0078d4',
    svg: 'original'
  },
  {
    tagID: 33,
    tagName: 'azuresqldatabase',
    altnames: [
      'azure-sql-database'
    ],
    color: '#005ba1',
    svg: 'original'
  },
  {
    tagID: 34,
    tagName: 'babel',
    altnames: [
      'babeljs'
    ],
    color: '#f9dc3e',
    svg: 'original'
  },
  {
    tagID: 35,
    tagName: 'backbonejs',
    altnames: [],
    color: '#002A41',
    svg: 'original'
  },
  {
    tagID: 36,
    tagName: 'ballerina',
    altnames: [
      'bal'
    ],
    color: '#46C0BC',
    svg: 'original'
  },
  {
    tagID: 37,
    tagName: 'bamboo',
    altnames: [
      'atlassianbamboo'
    ],
    color: '#1068e2',
    svg: 'original'
  },
  {
    tagID: 38,
    tagName: 'bash',
    altnames: [
      'bourneagainshell'
    ],
    color: '#293138',
    svg: 'original'
  },
  {
    tagID: 39,
    tagName: 'beats',
    altnames: [],
    color: '#07c',
    svg: 'original'
  },
  {
    tagID: 40,
    tagName: 'behance',
    altnames: [],
    color: '#0071e0',
    svg: 'original'
  },
  {
    tagID: 41,
    tagName: 'bitbucket',
    altnames: [
      'atlassianbitbucket'
    ],
    color: '#205081',
    svg: 'original'
  },
  {
    tagID: 42,
    tagName: 'blazor',
    altnames: [],
    color: '#5c2d91',
    svg: 'original'
  },
  {
    tagID: 43,
    tagName: 'blender',
    altnames: [],
    color: '#DC7B2E',
    svg: 'original'
  },
  {
    tagID: 44,
    tagName: 'bootstrap',
    altnames: [],
    color: '#712cf9',
    svg: 'original'
  },
  {
    tagID: 45,
    tagName: 'bower',
    altnames: [],
    color: '#ef5734',
    svg: 'original'
  },
  {
    tagID: 46,
    tagName: 'browserstack',
    altnames: [],
    color: '#0070f0',
    svg: 'original'
  },
  {
    tagID: 47,
    tagName: 'bulma',
    altnames: [
      'bulmacss'
    ],
    color: '#00d1b2',
    svg: 'plain'
  },
  {
    tagID: 48,
    tagName: 'bun',
    altnames: [],
    color: '#FBF0DF',
    svg: 'original'
  },
  {
    tagID: 49,
    tagName: 'c',
    altnames: [],
    color: '#03599c',
    svg: 'original'
  },
  {
    tagID: 50,
    tagName: 'cairo',
    altnames: [
      'cairographics'
    ],
    color: '#f39914',
    svg: 'original'
  },
  {
    tagID: 51,
    tagName: 'cakephp',
    altnames: [],
    color: '#D43D44',
    svg: 'original'
  },
  {
    tagID: 52,
    tagName: 'canva',
    altnames: [],
    color: '#00C4CC',
    svg: 'original'
  },
  {
    tagID: 53,
    tagName: 'capacitor',
    altnames: [
      'capacitorjs'
    ],
    color: '#53B9FF',
    svg: 'original'
  },
  {
    tagID: 54,
    tagName: 'carbon',
    altnames: [
      'Carbon Language'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 55,
    tagName: 'cassandra',
    altnames: [
      'Apache Cassandra'
    ],
    color: '#1185b0',
    svg: 'original'
  },
  {
    tagID: 56,
    tagName: 'centos',
    altnames: [],
    color: '#932178',
    svg: 'original'
  },
  {
    tagID: 57,
    tagName: 'ceylon',
    altnames: [
      'eclipseceylon',
      'ceylonlang'
    ],
    color: '#AB710A',
    svg: 'original'
  },
  {
    tagID: 58,
    tagName: 'chrome',
    altnames: [
      'googlechrome'
    ],
    color: '#ce4e4e',
    svg: 'original'
  },
  {
    tagID: 59,
    tagName: 'circleci',
    altnames: [],
    color: '#343434',
    svg: 'plain'
  },
  {
    tagID: 60,
    tagName: 'clarity',
    altnames: [
      'clarity-lang'
    ],
    color: '#13171a',
    svg: 'original'
  },
  {
    tagID: 61,
    tagName: 'clion',
    altnames: [],
    color: '#21d789',
    svg: 'original'
  },
  {
    tagID: 62,
    tagName: 'clojure',
    altnames: [],
    color: '#5881d8',
    svg: 'original'
  },
  {
    tagID: 63,
    tagName: 'clojurescript',
    altnames: [],
    color: '#96ca4b',
    svg: 'original'
  },
  {
    tagID: 64,
    tagName: 'cloudflare',
    altnames: [],
    color: '#F38020',
    svg: 'original'
  },
  {
    tagID: 65,
    tagName: 'cloudflareworkers',
    altnames: [
      'Cloudflare Workers'
    ],
    color: '#ea9344',
    svg: 'original'
  },
  {
    tagID: 66,
    tagName: 'cmake',
    altnames: [],
    color: '#0e8a16',
    svg: 'original'
  },
  {
    tagID: 67,
    tagName: 'codeac',
    altnames: [
      'codeacio'
    ],
    color: '#005096',
    svg: 'original'
  },
  {
    tagID: 68,
    tagName: 'codecov',
    altnames: [],
    color: '#e0225c',
    svg: 'plain'
  },
  {
    tagID: 69,
    tagName: 'codeigniter',
    altnames: [],
    color: '#ee4323',
    svg: 'plain'
  },
  {
    tagID: 70,
    tagName: 'codepen',
    altnames: [],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 71,
    tagName: 'coffeescript',
    altnames: [],
    color: '#28334c',
    svg: 'original'
  },
  {
    tagID: 72,
    tagName: 'composer',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 73,
    tagName: 'confluence',
    altnames: [
      'atlassianconfluence'
    ],
    color: '#136be6',
    svg: 'original'
  },
  {
    tagID: 74,
    tagName: 'consul',
    altnames: [
      'HashiCorp Consul'
    ],
    color: '#e03875',
    svg: 'original'
  },
  {
    tagID: 75,
    tagName: 'contao',
    altnames: [],
    color: '#f47c00',
    svg: 'original'
  },
  {
    tagID: 76,
    tagName: 'corejs',
    altnames: [
      'core-js',
      'core.js'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 77,
    tagName: 'cosmosdb',
    altnames: [
      'azurecosmosdb'
    ],
    color: '#59B3D8',
    svg: 'original'
  },
  {
    tagID: 78,
    tagName: 'couchbase',
    altnames: [],
    color: '#EA2328',
    svg: 'original'
  },
  {
    tagID: 79,
    tagName: 'couchdb',
    altnames: [
      'apachecouchdb'
    ],
    color: '#e42528',
    svg: 'original'
  },
  {
    tagID: 80,
    tagName: 'cplusplus',
    altnames: [
      'c++',
      'cpp'
    ],
    color: '#004482',
    svg: 'original'
  },
  {
    tagID: 81,
    tagName: 'crystal',
    altnames: [
      'crystallang'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 82,
    tagName: 'csharp',
    altnames: [
      'c#'
    ],
    color: '#68217a',
    svg: 'original'
  },
  {
    tagID: 83,
    tagName: 'css3',
    altnames: [
      'cascadingstylesheets3'
    ],
    color: '#3d8fc6',
    svg: 'original'
  },
  {
    tagID: 84,
    tagName: 'cucumber',
    altnames: [
      'cucumberjs'
    ],
    color: '#00a818',
    svg: 'plain'
  },
  {
    tagID: 85,
    tagName: 'cypressio',
    altnames: [
      'cypress'
    ],
    color: '#1b1e2e',
    svg: 'original'
  },
  {
    tagID: 86,
    tagName: 'd3js',
    altnames: [],
    color: '#f7974e',
    svg: 'original'
  },
  {
    tagID: 87,
    tagName: 'dart',
    altnames: [
      'googledart'
    ],
    color: '#00A8E1',
    svg: 'original'
  },
  {
    tagID: 88,
    tagName: 'datagrip',
    altnames: [],
    color: '#21d789',
    svg: 'original'
  },
  {
    tagID: 89,
    tagName: 'dataspell',
    altnames: [],
    color: '#087cfa',
    svg: 'original'
  },
  {
    tagID: 90,
    tagName: 'dbeaver',
    altnames: [],
    color: '#382a24',
    svg: 'original'
  },
  {
    tagID: 91,
    tagName: 'debian',
    altnames: [],
    color: '#A80030',
    svg: 'original'
  },
  {
    tagID: 92,
    tagName: 'denojs',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 93,
    tagName: 'devicon',
    altnames: [],
    color: '#60BE86',
    svg: 'original'
  },
  {
    tagID: 94,
    tagName: 'digitalocean',
    altnames: [],
    color: '#0080FF',
    svg: 'original'
  },
  {
    tagID: 95,
    tagName: 'discordjs',
    altnames: [],
    color: '#0c0c14',
    svg: 'original'
  },
  {
    tagID: 96,
    tagName: 'django',
    altnames: [],
    color: '#092e20',
    svg: 'plain'
  },
  {
    tagID: 97,
    tagName: 'djangorest',
    altnames: [
      'Django REST framework'
    ],
    color: '#a30000',
    svg: 'original'
  },
  {
    tagID: 98,
    tagName: 'docker',
    altnames: [],
    color: '#019bc6',
    svg: 'original'
  },
  {
    tagID: 99,
    tagName: 'doctrine',
    altnames: [],
    color: '#f56d39',
    svg: 'original'
  },
  {
    tagID: 100,
    tagName: 'dot-net',
    altnames: [
      'dotnet',
      '.net'
    ],
    color: '#1384c8',
    svg: 'original'
  },
  {
    tagID: 101,
    tagName: 'dotnetcore',
    altnames: [
      '.netcore'
    ],
    color: '#623697',
    svg: 'original'
  },
  {
    tagID: 102,
    tagName: 'dreamweaver',
    altnames: [
      'Adobe Dreamweaver'
    ],
    color: '#470137',
    svg: 'original'
  },
  {
    tagID: 103,
    tagName: 'dropwizard',
    altnames: [],
    color: '#24265d',
    svg: 'original'
  },
  {
    tagID: 104,
    tagName: 'drupal',
    altnames: [],
    color: '#0073BA',
    svg: 'original'
  },
  {
    tagID: 105,
    tagName: 'dynamodb',
    altnames: [],
    color: '#527fff',
    svg: 'original'
  },
  {
    tagID: 106,
    tagName: 'eclipse',
    altnames: [
      'Eclipse IDE'
    ],
    color: '#2c2255',
    svg: 'original'
  },
  {
    tagID: 107,
    tagName: 'ecto',
    altnames: [],
    color: '#77bf43',
    svg: 'original'
  },
  {
    tagID: 108,
    tagName: 'elasticsearch',
    altnames: [],
    color: '#00bfb3',
    svg: 'original'
  },
  {
    tagID: 109,
    tagName: 'electron',
    altnames: [
      'electronjs'
    ],
    color: '#47848f',
    svg: 'original'
  },
  {
    tagID: 110,
    tagName: 'eleventy',
    altnames: [
      '11ty'
    ],
    color: '#1f1f1f',
    svg: 'original'
  },
  {
    tagID: 111,
    tagName: 'elixir',
    altnames: [
      'elexirlang'
    ],
    color: '#380A4D',
    svg: 'original'
  },
  {
    tagID: 112,
    tagName: 'elm',
    altnames: [
      'elmlang'
    ],
    color: '#34495E',
    svg: 'original'
  },
  {
    tagID: 113,
    tagName: 'emacs',
    altnames: [
      'editingmacros'
    ],
    color: '#421f5f',
    svg: 'original'
  },
  {
    tagID: 114,
    tagName: 'embeddedc',
    altnames: [],
    color: '#444444',
    svg: 'original'
  },
  {
    tagID: 115,
    tagName: 'ember',
    altnames: [
      'ember.js',
      'emberjs'
    ],
    color: '#E04E39',
    svg: 'original'
  },
  {
    tagID: 116,
    tagName: 'envoy',
    altnames: [
      'envoyproxy'
    ],
    color: '#e13eaf',
    svg: 'original'
  },
  {
    tagID: 117,
    tagName: 'erlang',
    altnames: [],
    color: '#a90533',
    svg: 'original'
  },
  {
    tagID: 118,
    tagName: 'eslint',
    altnames: [],
    color: '#4b32c3',
    svg: 'original'
  },
  {
    tagID: 119,
    tagName: 'express',
    altnames: [
      'expressjs'
    ],
    color: '#444',
    svg: 'original'
  },
  {
    tagID: 120,
    tagName: 'facebook',
    altnames: [],
    color: '#3d5a98',
    svg: 'original'
  },
  {
    tagID: 121,
    tagName: 'fastapi',
    altnames: [],
    color: '#009688',
    svg: 'original'
  },
  {
    tagID: 122,
    tagName: 'fastify',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 123,
    tagName: 'faunadb',
    altnames: [
      'fauna'
    ],
    color: '#3A1AB6',
    svg: 'original'
  },
  {
    tagID: 124,
    tagName: 'feathersjs',
    altnames: [],
    color: '#333333',
    svg: 'original'
  },
  {
    tagID: 125,
    tagName: 'fedora',
    altnames: [],
    color: '#294172',
    svg: 'original'
  },
  {
    tagID: 126,
    tagName: 'figma',
    altnames: [],
    color: '#f24e1e',
    svg: 'original'
  },
  {
    tagID: 127,
    tagName: 'filezilla',
    altnames: [],
    color: '#bb0001',
    svg: 'original'
  },
  {
    tagID: 128,
    tagName: 'firebase',
    altnames: [],
    color: '#ffa000',
    svg: 'original'
  },
  {
    tagID: 129,
    tagName: 'firefox',
    altnames: [
      'mozillafirefox'
    ],
    color: '#DD732A',
    svg: 'original'
  },
  {
    tagID: 130,
    tagName: 'flask',
    altnames: [],
    color: '#010101',
    svg: 'original'
  },
  {
    tagID: 131,
    tagName: 'flutter',
    altnames: [],
    color: '#3FB6D3',
    svg: 'original'
  },
  {
    tagID: 132,
    tagName: 'fortran',
    altnames: [],
    color: '#734f96',
    svg: 'original'
  },
  {
    tagID: 133,
    tagName: 'foundation',
    altnames: [],
    color: '#008cba',
    svg: 'original'
  },
  {
    tagID: 134,
    tagName: 'framermotion',
    altnames: [
      'framer-motion',
      'framer'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 135,
    tagName: 'framework7',
    altnames: [],
    color: '#ee350f',
    svg: 'original'
  },
  {
    tagID: 136,
    tagName: 'fsharp',
    altnames: [
      'f#'
    ],
    color: '#378BBA',
    svg: 'original'
  },
  {
    tagID: 137,
    tagName: 'gatling',
    altnames: [],
    color: '#f78557',
    svg: 'original'
  },
  {
    tagID: 138,
    tagName: 'gatsby',
    altnames: [
      'gatsbyjs'
    ],
    color: '#64328B',
    svg: 'original'
  },
  {
    tagID: 139,
    tagName: 'gazebo',
    altnames: [],
    color: '#f58113',
    svg: 'original'
  },
  {
    tagID: 140,
    tagName: 'gcc',
    altnames: [
      'gnucompilercollection'
    ],
    color: '#ffcfab',
    svg: 'original'
  },
  {
    tagID: 141,
    tagName: 'gentoo',
    altnames: [],
    color: '#9991d9',
    svg: 'original'
  },
  {
    tagID: 142,
    tagName: 'ghost',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 143,
    tagName: 'gimp',
    altnames: [],
    color: '#716955',
    svg: 'original'
  },
  {
    tagID: 144,
    tagName: 'git',
    altnames: [],
    color: '#f34f29',
    svg: 'original'
  },
  {
    tagID: 145,
    tagName: 'gitbook',
    altnames: [],
    color: '#346ddb',
    svg: 'original'
  },
  {
    tagID: 146,
    tagName: 'github',
    altnames: [],
    color: '#181616',
    svg: 'original'
  },
  {
    tagID: 147,
    tagName: 'githubactions',
    altnames: [
      'GitHub Actions'
    ],
    color: '#2088FF',
    svg: 'original'
  },
  {
    tagID: 148,
    tagName: 'githubcodespaces',
    altnames: [
      'GitHub Codespaces'
    ],
    color: '#24292e',
    svg: 'original'
  },
  {
    tagID: 149,
    tagName: 'gitlab',
    altnames: [],
    color: '#E24329',
    svg: 'original'
  },
  {
    tagID: 150,
    tagName: 'gitpod',
    altnames: [
      'gitpod-io'
    ],
    color: '#FFA132',
    svg: 'original'
  },
  {
    tagID: 151,
    tagName: 'gitter',
    altnames: [],
    color: '#000000',
    svg: 'plain'
  },
  {
    tagID: 152,
    tagName: 'go',
    altnames: [
      'golang'
    ],
    color: '#00acd7',
    svg: 'original'
  },
  {
    tagID: 153,
    tagName: 'godot',
    altnames: [],
    color: '#478cbf',
    svg: 'original'
  },
  {
    tagID: 154,
    tagName: 'goland',
    altnames: [],
    color: '#087cfa',
    svg: 'original'
  },
  {
    tagID: 155,
    tagName: 'google',
    altnames: [],
    color: '#587dbd',
    svg: 'original'
  },
  {
    tagID: 156,
    tagName: 'googlecloud',
    altnames: [],
    color: '#557ebf',
    svg: 'original'
  },
  {
    tagID: 157,
    tagName: 'gradle',
    altnames: [
      'apachegradle',
      'gradlebuildtool'
    ],
    color: '#02303a',
    svg: 'original'
  },
  {
    tagID: 158,
    tagName: 'grafana',
    altnames: [],
    color: '#f7a525',
    svg: 'original'
  },
  {
    tagID: 159,
    tagName: 'grails',
    altnames: [
      'Grails Framework'
    ],
    color: '#feb571',
    svg: 'original'
  },
  {
    tagID: 160,
    tagName: 'graphql',
    altnames: [],
    color: '#e434aa',
    svg: 'plain'
  },
  {
    tagID: 161,
    tagName: 'groovy',
    altnames: [
      'groovylang',
      'apachegroovy'
    ],
    color: '#619cbc',
    svg: 'original'
  },
  {
    tagID: 162,
    tagName: 'grpc',
    altnames: [
      'grpcio',
      'Google Remote Procedure Call'
    ],
    color: '#00b0ad',
    svg: 'plain'
  },
  {
    tagID: 163,
    tagName: 'grunt',
    altnames: [
      'gruntjs'
    ],
    color: '#fcaa1a',
    svg: 'original'
  },
  {
    tagID: 164,
    tagName: 'gulp',
    altnames: [
      'gulpjs'
    ],
    color: '#eb4a4b',
    svg: 'plain'
  },
  {
    tagID: 165,
    tagName: 'hadoop',
    altnames: [
      'Apache Hadoop'
    ],
    color: '#ffff00',
    svg: 'original'
  },
  {
    tagID: 166,
    tagName: 'handlebars',
    altnames: [
      'handlebarsjs'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 167,
    tagName: 'hardhat',
    altnames: [],
    color: '#fff100',
    svg: 'original'
  },
  {
    tagID: 168,
    tagName: 'harvester',
    altnames: [
      'harvesterhci'
    ],
    color: '#00A580',
    svg: 'original'
  },
  {
    tagID: 169,
    tagName: 'haskell',
    altnames: [],
    color: '#5E5185',
    svg: 'original'
  },
  {
    tagID: 170,
    tagName: 'haxe',
    altnames: [],
    color: '#EA8220',
    svg: 'original'
  },
  {
    tagID: 171,
    tagName: 'helm',
    altnames: [],
    color: '#0F1689',
    svg: 'original'
  },
  {
    tagID: 172,
    tagName: 'heroku',
    altnames: [],
    color: '#6762a6',
    svg: 'original'
  },
  {
    tagID: 173,
    tagName: 'hibernate',
    altnames: [],
    color: '#bcae79',
    svg: 'original'
  },
  {
    tagID: 174,
    tagName: 'homebrew',
    altnames: [],
    color: '#fbb040',
    svg: 'original'
  },
  {
    tagID: 175,
    tagName: 'html5',
    altnames: [
      'hypertextmarkdownlanguage5'
    ],
    color: '#e54d26',
    svg: 'original'
  },
  {
    tagID: 176,
    tagName: 'hugo',
    altnames: [
      'gohugo'
    ],
    color: '#FF4088',
    svg: 'original'
  },
  {
    tagID: 177,
    tagName: 'ie10',
    altnames: [
      'internetexplorer10'
    ],
    color: '#1EBBEE',
    svg: 'original'
  },
  {
    tagID: 178,
    tagName: 'ifttt',
    altnames: [
      'ifthisthenthat'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 179,
    tagName: 'illustrator',
    altnames: [
      'adobeillustrator'
    ],
    color: '#faa625',
    svg: 'plain'
  },
  {
    tagID: 180,
    tagName: 'influxdb',
    altnames: [],
    color: '#020a47',
    svg: 'original'
  },
  {
    tagID: 181,
    tagName: 'inkscape',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 182,
    tagName: 'insomnia',
    altnames: [
      'Insomnia Rest Client'
    ],
    color: '#4000bf',
    svg: 'original'
  },
  {
    tagID: 183,
    tagName: 'intellij',
    altnames: [
      'intellijidea'
    ],
    color: '#087cfa',
    svg: 'original'
  },
  {
    tagID: 184,
    tagName: 'ionic',
    altnames: [],
    color: '#4e8ef7',
    svg: 'original'
  },
  {
    tagID: 185,
    tagName: 'jaegertracing',
    altnames: [
      'jaeger'
    ],
    color: '#67cfe3',
    svg: 'original'
  },
  {
    tagID: 186,
    tagName: 'jamstack',
    altnames: [],
    color: '#F0047F',
    svg: 'original'
  },
  {
    tagID: 187,
    tagName: 'jasmine',
    altnames: [
      'jasminejs'
    ],
    color: '#8a4182',
    svg: 'original'
  },
  {
    tagID: 188,
    tagName: 'java',
    altnames: [],
    color: '#EA2D2E',
    svg: 'original'
  },
  {
    tagID: 189,
    tagName: 'javascript',
    altnames: [
      'js',
      'ecmascript'
    ],
    color: '#f0db4f',
    svg: 'original'
  },
  {
    tagID: 190,
    tagName: 'jeet',
    altnames: [],
    color: '#FF664A',
    svg: 'original'
  },
  {
    tagID: 191,
    tagName: 'jekyll',
    altnames: [
      'jestjs'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 192,
    tagName: 'jenkins',
    altnames: [
      'hudson'
    ],
    color: '#F0D6B7',
    svg: 'original'
  },
  {
    tagID: 193,
    tagName: 'jest',
    altnames: [
      'jestjs'
    ],
    color: '#99425b',
    svg: 'plain'
  },
  {
    tagID: 194,
    tagName: 'jetbrains',
    altnames: [
      'intellijsoftware'
    ],
    color: '#FDCC21',
    svg: 'original'
  },
  {
    tagID: 195,
    tagName: 'jetpackcompose',
    altnames: [],
    color: '#4285f4',
    svg: 'original'
  },
  {
    tagID: 196,
    tagName: 'jira',
    altnames: [
      'atlassianjira'
    ],
    color: '#2684ff',
    svg: 'original'
  },
  {
    tagID: 197,
    tagName: 'jiraalign',
    altnames: [
      'Jira Align'
    ],
    color: '#2684FF',
    svg: 'original'
  },
  {
    tagID: 198,
    tagName: 'jquery',
    altnames: [
      'jqueryjs'
    ],
    color: '#0769ad',
    svg: 'original'
  },
  {
    tagID: 199,
    tagName: 'json',
    altnames: [
      'JavaScript Object Notation'
    ],
    color: '#505050',
    svg: 'original'
  },
  {
    tagID: 200,
    tagName: 'jule',
    altnames: [
      'julelang'
    ],
    color: '#5f7389',
    svg: 'original'
  },
  {
    tagID: 201,
    tagName: 'julia',
    altnames: [
      'julialang'
    ],
    color: '#28a745',
    svg: 'original'
  },
  {
    tagID: 202,
    tagName: 'junit',
    altnames: [],
    color: '#dc514a',
    svg: 'original'
  },
  {
    tagID: 203,
    tagName: 'jupyter',
    altnames: [
      'jupyternotebook'
    ],
    color: '#F37726',
    svg: 'original'
  },
  {
    tagID: 204,
    tagName: 'k3os',
    altnames: [],
    color: '#fd824e',
    svg: 'original'
  },
  {
    tagID: 205,
    tagName: 'k3s',
    altnames: [],
    color: '#ffc519',
    svg: 'original'
  },
  {
    tagID: 206,
    tagName: 'k6',
    altnames: [],
    color: '#7D64FF',
    svg: 'original'
  },
  {
    tagID: 207,
    tagName: 'kaggle',
    altnames: [],
    color: '#20BEFF',
    svg: 'original'
  },
  {
    tagID: 208,
    tagName: 'karatelabs',
    altnames: [
      'karate'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 209,
    tagName: 'karma',
    altnames: [
      'karmarunner',
      'karmajs'
    ],
    color: '#56c5a8',
    svg: 'original'
  },
  {
    tagID: 210,
    tagName: 'kdeneon',
    altnames: [],
    color: '#21769a',
    svg: 'original'
  },
  {
    tagID: 211,
    tagName: 'keras',
    altnames: [],
    color: '#d00000',
    svg: 'original'
  },
  {
    tagID: 212,
    tagName: 'kibana',
    altnames: [],
    color: '#F04E98',
    svg: 'original'
  },
  {
    tagID: 213,
    tagName: 'knexjs',
    altnames: [],
    color: '#e16426',
    svg: 'original'
  },
  {
    tagID: 214,
    tagName: 'knockout',
    altnames: [
      'knockoutjs'
    ],
    color: '#e42e16',
    svg: 'plain-wordmark'
  },
  {
    tagID: 215,
    tagName: 'kotlin',
    altnames: [
      'kotlinlang'
    ],
    color: '#c711e1',
    svg: 'original'
  },
  {
    tagID: 216,
    tagName: 'krakenjs',
    altnames: [
      'kraken'
    ],
    color: '#0081C2',
    svg: 'original'
  },
  {
    tagID: 217,
    tagName: 'ktor',
    altnames: [],
    color: '#fc801d',
    svg: 'original'
  },
  {
    tagID: 218,
    tagName: 'kubernetes',
    altnames: [],
    color: '#326ce5',
    svg: 'original'
  },
  {
    tagID: 219,
    tagName: 'labview',
    altnames: [],
    color: '#fed500',
    svg: 'original'
  },
  {
    tagID: 220,
    tagName: 'laravel',
    altnames: [],
    color: '#f0513f',
    svg: 'original'
  },
  {
    tagID: 221,
    tagName: 'latex',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 222,
    tagName: 'less',
    altnames: [
      'lesscss'
    ],
    color: '#2a4d80',
    svg: 'plain-wordmark'
  },
  {
    tagID: 223,
    tagName: 'linkedin',
    altnames: [],
    color: '#0076b2',
    svg: 'original'
  },
  {
    tagID: 224,
    tagName: 'linux',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 225,
    tagName: 'liquibase',
    altnames: [],
    color: '#FF3C00',
    svg: 'original'
  },
  {
    tagID: 226,
    tagName: 'livewire',
    altnames: [
      'laravel-livewire'
    ],
    color: '#FB70A9',
    svg: 'original'
  },
  {
    tagID: 227,
    tagName: 'llvm',
    altnames: [
      'Low Level Virtual Machine'
    ],
    color: '#5A90B6',
    svg: 'original'
  },
  {
    tagID: 228,
    tagName: 'lodash',
    altnames: [],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 229,
    tagName: 'logstash',
    altnames: [],
    color: '#fec514',
    svg: 'original'
  },
  {
    tagID: 230,
    tagName: 'lua',
    altnames: [
      'lualang'
    ],
    color: '#000080',
    svg: 'original'
  },
  {
    tagID: 231,
    tagName: 'lumen',
    altnames: [
      'Laravel Lumen',
      'Lumen Laravel',
      'Laravel Lumen Framework',
      'laravel.lumen'
    ],
    color: '#e54537',
    svg: 'original'
  },
  {
    tagID: 232,
    tagName: 'magento',
    altnames: [],
    color: '#f26322',
    svg: 'original'
  },
  {
    tagID: 233,
    tagName: 'mariadb',
    altnames: [],
    color: '#003545',
    svg: 'original'
  },
  {
    tagID: 234,
    tagName: 'markdown',
    altnames: [
      'md'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 235,
    tagName: 'materializecss',
    altnames: [
      'materialize',
      'materialize-css',
      'materialize css'
    ],
    color: '#EB7077',
    svg: 'original'
  },
  {
    tagID: 236,
    tagName: 'materialui',
    altnames: [
      'mui'
    ],
    color: '#1FA6CA',
    svg: 'original'
  },
  {
    tagID: 237,
    tagName: 'matlab',
    altnames: [],
    color: '#6dd0c7',
    svg: 'original'
  },
  {
    tagID: 238,
    tagName: 'matplotlib',
    altnames: [],
    color: '#11557C',
    svg: 'original'
  },
  {
    tagID: 239,
    tagName: 'maven',
    altnames: [
      'apachemaven',
      'mvn'
    ],
    color: '#e97826',
    svg: 'original'
  },
  {
    tagID: 240,
    tagName: 'maya',
    altnames: [],
    color: '#149B9A',
    svg: 'original'
  },
  {
    tagID: 241,
    tagName: 'meteor',
    altnames: [
      'meteorjs'
    ],
    color: '#df5052',
    svg: 'original'
  },
  {
    tagID: 242,
    tagName: 'microsoftsqlserver',
    altnames: [
      'msql',
      'mssql',
      'Microsoft SQL Server'
    ],
    color: '#ee352c',
    svg: 'original'
  },
  {
    tagID: 243,
    tagName: 'minitab',
    altnames: [],
    color: '#8dc63f',
    svg: 'original'
  },
  {
    tagID: 244,
    tagName: 'mithril',
    altnames: [
      'mithril.js'
    ],
    color: '#010002',
    svg: 'original'
  },
  {
    tagID: 245,
    tagName: 'mobx',
    altnames: [
      'mobxjs'
    ],
    color: '#e05e11',
    svg: 'original'
  },
  {
    tagID: 246,
    tagName: 'mocha',
    altnames: [],
    color: '#8d6748',
    svg: 'original'
  },
  {
    tagID: 247,
    tagName: 'modx',
    altnames: [],
    color: '#00decc',
    svg: 'original'
  },
  {
    tagID: 248,
    tagName: 'moleculer',
    altnames: [
      'moleculerjs',
      'moleculer.js'
    ],
    color: '#3cafce',
    svg: 'original'
  },
  {
    tagID: 249,
    tagName: 'mongodb',
    altnames: [],
    color: '#4FAA41',
    svg: 'original'
  },
  {
    tagID: 250,
    tagName: 'mongoose',
    altnames: [
      'mongoosejs'
    ],
    color: '#860000',
    svg: 'original'
  },
  {
    tagID: 251,
    tagName: 'moodle',
    altnames: [],
    color: '#F7931E',
    svg: 'original'
  },
  {
    tagID: 252,
    tagName: 'msdos',
    altnames: [
      'microsoftdiskoperatingsystem'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 253,
    tagName: 'mysql',
    altnames: [
      'mystructuredquerylanguage'
    ],
    color: '#00618a',
    svg: 'original'
  },
  {
    tagID: 254,
    tagName: 'nano',
    altnames: [
      'gnu-nano',
      'GNU nano'
    ],
    color: '#C8F',
    svg: 'original'
  },
  {
    tagID: 255,
    tagName: 'neo4j',
    altnames: [],
    color: '#018BFF',
    svg: 'original'
  },
  {
    tagID: 256,
    tagName: 'neovim',
    altnames: [],
    color: '#5fb950',
    svg: 'original'
  },
  {
    tagID: 257,
    tagName: 'nestjs',
    altnames: [],
    color: '#df234f',
    svg: 'original'
  },
  {
    tagID: 258,
    tagName: 'netlify',
    altnames: [],
    color: '#05BDBA',
    svg: 'original'
  },
  {
    tagID: 259,
    tagName: 'networkx',
    altnames: [],
    color: '#2c7fb8',
    svg: 'original'
  },
  {
    tagID: 260,
    tagName: 'nextjs',
    altnames: [],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 261,
    tagName: 'nginx',
    altnames: [],
    color: '#090',
    svg: 'original'
  },
  {
    tagID: 262,
    tagName: 'ngrx',
    altnames: [],
    color: '#412846',
    svg: 'original'
  },
  {
    tagID: 263,
    tagName: 'nhibernate',
    altnames: [],
    color: '#903a36',
    svg: 'original'
  },
  {
    tagID: 264,
    tagName: 'nim',
    altnames: [
      'nimlang'
    ],
    color: '#ffe953',
    svg: 'original'
  },
  {
    tagID: 265,
    tagName: 'nimble',
    altnames: [],
    color: '#f7e941',
    svg: 'original'
  },
  {
    tagID: 266,
    tagName: 'nixos',
    altnames: [],
    color: '#5277C3',
    svg: 'original'
  },
  {
    tagID: 267,
    tagName: 'nodejs',
    altnames: [],
    color: '#5fa04e',
    svg: 'original'
  },
  {
    tagID: 268,
    tagName: 'nodemon',
    altnames: [
      'nodemonjs'
    ],
    color: '#76d04b',
    svg: 'original'
  },
  {
    tagID: 269,
    tagName: 'nodewebkit',
    altnames: [
      'nwjs'
    ],
    color: '#3d3b47',
    svg: 'original'
  },
  {
    tagID: 270,
    tagName: 'nomad',
    altnames: [
      'HashiCorp Nomad'
    ],
    color: '#00ca8e',
    svg: 'original'
  },
  {
    tagID: 271,
    tagName: 'norg',
    altnames: [
      'neorg'
    ],
    color: '#4878be',
    svg: 'original'
  },
  {
    tagID: 272,
    tagName: 'notion',
    altnames: [],
    color: '#fff',
    svg: 'original'
  },
  {
    tagID: 273,
    tagName: 'npm',
    altnames: [
      'npmjs',
      'nodepackagemanager'
    ],
    color: '#cb3837',
    svg: 'original-wordmark'
  },
  {
    tagID: 274,
    tagName: 'nuget',
    altnames: [],
    color: '#004880',
    svg: 'original'
  },
  {
    tagID: 275,
    tagName: 'numpy',
    altnames: [],
    color: '#4dabcf',
    svg: 'original'
  },
  {
    tagID: 276,
    tagName: 'nuxtjs',
    altnames: [],
    color: '#00c48d',
    svg: 'original'
  },
  {
    tagID: 277,
    tagName: 'oauth',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 278,
    tagName: 'objectivec',
    altnames: [],
    color: '#0b5a9d',
    svg: 'plain'
  },
  {
    tagID: 279,
    tagName: 'ocaml',
    altnames: [],
    color: '#F18803',
    svg: 'original'
  },
  {
    tagID: 280,
    tagName: 'ohmyzsh',
    altnames: [
      'omz',
      'ohmyz.sh',
      'Oh My Zsh'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 281,
    tagName: 'okta',
    altnames: [
      'okta developer'
    ],
    color: '#0f82c2',
    svg: 'original'
  },
  {
    tagID: 282,
    tagName: 'openal',
    altnames: [],
    color: '#7e000d',
    svg: 'original'
  },
  {
    tagID: 283,
    tagName: 'openapi',
    altnames: [],
    color: '#91d400',
    svg: 'original'
  },
  {
    tagID: 284,
    tagName: 'opencl',
    altnames: [],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 285,
    tagName: 'opencv',
    altnames: [],
    color: '#128dff',
    svg: 'original'
  },
  {
    tagID: 286,
    tagName: 'opengl',
    altnames: [
      'opengraphicslibrary'
    ],
    color: '#5586a4',
    svg: 'original'
  },
  {
    tagID: 287,
    tagName: 'openstack',
    altnames: [],
    color: '#ed1944',
    svg: 'original'
  },
  {
    tagID: 288,
    tagName: 'opensuse',
    altnames: [],
    color: '#73ba25',
    svg: 'original'
  },
  {
    tagID: 289,
    tagName: 'opentelemetry',
    altnames: [],
    color: '#f5a800',
    svg: 'original'
  },
  {
    tagID: 290,
    tagName: 'opera',
    altnames: [],
    color: '#f7192d',
    svg: 'original'
  },
  {
    tagID: 291,
    tagName: 'oracle',
    altnames: [
      'oracledatabase'
    ],
    color: '#EA1B22',
    svg: 'original'
  },
  {
    tagID: 292,
    tagName: 'ory',
    altnames: [],
    color: '#5528ff',
    svg: 'original'
  },
  {
    tagID: 293,
    tagName: 'p5js',
    altnames: [
      'p5.js'
    ],
    color: '#ED225D',
    svg: 'original'
  },
  {
    tagID: 294,
    tagName: 'packer',
    altnames: [],
    color: '#1d94dd',
    svg: 'original'
  },
  {
    tagID: 295,
    tagName: 'pandas',
    altnames: [],
    color: '#130754',
    svg: 'original'
  },
  {
    tagID: 296,
    tagName: 'perl',
    altnames: [],
    color: '#212177',
    svg: 'original'
  },
  {
    tagID: 297,
    tagName: 'pfsense',
    altnames: [
      'pfSense'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 298,
    tagName: 'phalcon',
    altnames: [],
    color: '#76c39b',
    svg: 'original'
  },
  {
    tagID: 299,
    tagName: 'phoenix',
    altnames: [
      'Phoenix Framework'
    ],
    color: '#FD4F00',
    svg: 'original'
  },
  {
    tagID: 300,
    tagName: 'photonengine',
    altnames: [
      'photon'
    ],
    color: '#004480',
    svg: 'original'
  },
  {
    tagID: 301,
    tagName: 'photoshop',
    altnames: [
      'adobephotoshop'
    ],
    color: '#001e36',
    svg: 'original'
  },
  {
    tagID: 302,
    tagName: 'php',
    altnames: [
      'PHP Hypertext Preprocessor',
      'Personal Home Page'
    ],
    color: '#777bb3',
    svg: 'original'
  },
  {
    tagID: 303,
    tagName: 'phpstorm',
    altnames: [],
    color: '#b74af7',
    svg: 'original'
  },
  {
    tagID: 304,
    tagName: 'playwright',
    altnames: [],
    color: '#2EAD33',
    svg: 'original'
  },
  {
    tagID: 305,
    tagName: 'plotly',
    altnames: [],
    color: '#3d4c73',
    svg: 'original'
  },
  {
    tagID: 306,
    tagName: 'pnpm',
    altnames: [
      'performant npm'
    ],
    color: '#f9ad00',
    svg: 'original'
  },
  {
    tagID: 307,
    tagName: 'podman',
    altnames: [],
    color: '#892ca0',
    svg: 'original'
  },
  {
    tagID: 308,
    tagName: 'poetry',
    altnames: [
      'python-poetry'
    ],
    color: '#0080c5',
    svg: 'original'
  },
  {
    tagID: 309,
    tagName: 'polygon',
    altnames: [],
    color: '#7950DD',
    svg: 'original'
  },
  {
    tagID: 310,
    tagName: 'portainer',
    altnames: [],
    color: '#3BBCED',
    svg: 'original'
  },
  {
    tagID: 311,
    tagName: 'postcss',
    altnames: [],
    color: '#DD3A0A',
    svg: 'original'
  },
  {
    tagID: 312,
    tagName: 'postgresql',
    altnames: [],
    color: '#336791',
    svg: 'original'
  },
  {
    tagID: 313,
    tagName: 'postman',
    altnames: [],
    color: '#f37036',
    svg: 'original'
  },
  {
    tagID: 314,
    tagName: 'powershell',
    altnames: [
      'ps'
    ],
    color: '#1E2A3A',
    svg: 'original'
  },
  {
    tagID: 315,
    tagName: 'premierepro',
    altnames: [
      'adobepremierepro'
    ],
    color: '#2A0634',
    svg: 'plain'
  },
  {
    tagID: 316,
    tagName: 'prisma',
    altnames: [],
    color: '#2D3748',
    svg: 'original'
  },
  {
    tagID: 317,
    tagName: 'processing',
    altnames: [
      'processingpy'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 318,
    tagName: 'prolog',
    altnames: [
      'swi-prolog'
    ],
    color: '#F46C30',
    svg: 'original'
  },
  {
    tagID: 319,
    tagName: 'prometheus',
    altnames: [],
    color: '#e75225',
    svg: 'original'
  },
  {
    tagID: 320,
    tagName: 'protractor',
    altnames: [
      'protractorjs',
      'protractortest'
    ],
    color: '#d51c2f',
    svg: 'original'
  },
  {
    tagID: 321,
    tagName: 'pulsar',
    altnames: [
      'Pulsar Edit'
    ],
    color: '#2c3e50',
    svg: 'original'
  },
  {
    tagID: 322,
    tagName: 'pulumi',
    altnames: [],
    color: '#f6bf29',
    svg: 'original'
  },
  {
    tagID: 323,
    tagName: 'puppeteer',
    altnames: [],
    color: '#00d8a2',
    svg: 'original'
  },
  {
    tagID: 324,
    tagName: 'purescript',
    altnames: [],
    color: '#14161a',
    svg: 'original'
  },
  {
    tagID: 325,
    tagName: 'putty',
    altnames: [],
    color: '#0000fc',
    svg: 'original'
  },
  {
    tagID: 326,
    tagName: 'pycharm',
    altnames: [],
    color: '#21D789',
    svg: 'original'
  },
  {
    tagID: 327,
    tagName: 'pypi',
    altnames: [
      'Python Package Index'
    ],
    color: '#3775a9',
    svg: 'original'
  },
  {
    tagID: 328,
    tagName: 'pyscript',
    altnames: [],
    color: '#fda703',
    svg: 'original-wordmark'
  },
  {
    tagID: 329,
    tagName: 'pytest',
    altnames: [],
    color: '#009fe3',
    svg: 'original'
  },
  {
    tagID: 330,
    tagName: 'python',
    altnames: [],
    color: '#ffd845',
    svg: 'original'
  },
  {
    tagID: 331,
    tagName: 'pytorch',
    altnames: [],
    color: '#EE4C2C',
    svg: 'original'
  },
  {
    tagID: 332,
    tagName: 'qodana',
    altnames: [],
    color: '#ff318c',
    svg: 'original'
  },
  {
    tagID: 333,
    tagName: 'qt',
    altnames: [],
    color: '#41cd52',
    svg: 'original'
  },
  {
    tagID: 334,
    tagName: 'quarkus',
    altnames: [],
    color: '#4695EB',
    svg: 'original'
  },
  {
    tagID: 335,
    tagName: 'quasar',
    altnames: [],
    color: '#00b4ff',
    svg: 'original'
  },
  {
    tagID: 336,
    tagName: 'qwik',
    altnames: [],
    color: '#18B6F6',
    svg: 'original'
  },
  {
    tagID: 337,
    tagName: 'r',
    altnames: [
      'rlang'
    ],
    color: '#1f65b7',
    svg: 'original'
  },
  {
    tagID: 338,
    tagName: 'rabbitmq',
    altnames: [],
    color: '#ff6600',
    svg: 'original'
  },
  {
    tagID: 339,
    tagName: 'rails',
    altnames: [
      'rubyonrails'
    ],
    color: '#CC0000',
    svg: 'original-wordmark'
  },
  {
    tagID: 340,
    tagName: 'railway',
    altnames: [],
    color: '#fff',
    svg: 'original'
  },
  {
    tagID: 341,
    tagName: 'rancher',
    altnames: [],
    color: '#2453FF',
    svg: 'original'
  },
  {
    tagID: 342,
    tagName: 'raspberrypi',
    altnames: [
      'rpi'
    ],
    color: '#c51850',
    svg: 'original'
  },
  {
    tagID: 343,
    tagName: 'reach',
    altnames: [
      'Reach Lang'
    ],
    color: '#6AC6E7',
    svg: 'original'
  },
  {
    tagID: 344,
    tagName: 'react',
    altnames: [
      'reactjs'
    ],
    color: '#61dafb',
    svg: 'original'
  },
  {
    tagID: 345,
    tagName: 'reactbootstrap',
    altnames: [
      'React-Bootstrap',
      'react bootstrap'
    ],
    color: '#41e0fd',
    svg: 'original'
  },
  {
    tagID: 346,
    tagName: 'reactnavigation',
    altnames: [],
    color: '#7b61c1',
    svg: 'original'
  },
  {
    tagID: 347,
    tagName: 'readthedocs',
    altnames: [
      'Read The Docs'
    ],
    color: '#32322A',
    svg: 'original'
  },
  {
    tagID: 348,
    tagName: 'realm',
    altnames: [],
    color: '#6e60f9',
    svg: 'original'
  },
  {
    tagID: 349,
    tagName: 'rect',
    altnames: [
      'rectlang'
    ],
    color: '#262626',
    svg: 'original'
  },
  {
    tagID: 350,
    tagName: 'redhat',
    altnames: [],
    color: '#e93442',
    svg: 'original'
  },
  {
    tagID: 351,
    tagName: 'redis',
    altnames: [
      'remotedictionaryserver'
    ],
    color: '#d82c20',
    svg: 'original'
  },
  {
    tagID: 352,
    tagName: 'redux',
    altnames: [
      'reduxjs'
    ],
    color: '#764abc',
    svg: 'original'
  },
  {
    tagID: 353,
    tagName: 'renpy',
    altnames: [
      `Ren'Py`
    ],
    color: '#ff7f7f',
    svg: 'original'
  },
  {
    tagID: 354,
    tagName: 'replit',
    altnames: [],
    color: '#F26207',
    svg: 'original'
  },
  {
    tagID: 355,
    tagName: 'rider',
    altnames: [],
    color: '#dd1265',
    svg: 'original'
  },
  {
    tagID: 356,
    tagName: 'rocksdb',
    altnames: [],
    color: '#ffbe00',
    svg: 'original'
  },
  {
    tagID: 357,
    tagName: 'rockylinux',
    altnames: [
      'rocky'
    ],
    color: '#10b982',
    svg: 'original'
  },
  {
    tagID: 358,
    tagName: 'rollup',
    altnames: [
      'rollupjs',
      'rollup.js'
    ],
    color: '#ff3333',
    svg: 'original'
  },
  {
    tagID: 359,
    tagName: 'ros',
    altnames: [
      'robotoperatingsystem'
    ],
    color: '#21304c',
    svg: 'original'
  },
  {
    tagID: 360,
    tagName: 'rspec',
    altnames: [],
    color: '#6de1fa',
    svg: 'original'
  },
  {
    tagID: 361,
    tagName: 'rstudio',
    altnames: [],
    color: '#75aadb',
    svg: 'original'
  },
  {
    tagID: 362,
    tagName: 'ruby',
    altnames: [
      'rubylang'
    ],
    color: '#d91404',
    svg: 'original'
  },
  {
    tagID: 363,
    tagName: 'rubymine',
    altnames: [],
    color: '#FC801D',
    svg: 'original'
  },
  {
    tagID: 364,
    tagName: 'rust',
    altnames: [
      'rustlang'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 365,
    tagName: 'rxjs',
    altnames: [
      'Reactive Extensions for JavaScript'
    ],
    color: '#df1c85',
    svg: 'original'
  },
  {
    tagID: 366,
    tagName: 'safari',
    altnames: [
      'applesafari'
    ],
    color: '#1B88CA',
    svg: 'original'
  },
  {
    tagID: 367,
    tagName: 'salesforce',
    altnames: [],
    color: '#00a1e0',
    svg: 'original'
  },
  {
    tagID: 368,
    tagName: 'sanity',
    altnames: [],
    color: '#F03E2F',
    svg: 'original'
  },
  {
    tagID: 369,
    tagName: 'sass',
    altnames: [
      'scss'
    ],
    color: '#cc6699',
    svg: 'original'
  },
  {
    tagID: 370,
    tagName: 'scala',
    altnames: [
      'scalalang'
    ],
    color: '#de3423',
    svg: 'original'
  },
  {
    tagID: 371,
    tagName: 'scalingo',
    altnames: [],
    color: '#173aee',
    svg: 'original'
  },
  {
    tagID: 372,
    tagName: 'scikitlearn',
    altnames: [
      'scikit-learn',
      'scikit',
      'sklearn'
    ],
    color: '#f89939',
    svg: 'original'
  },
  {
    tagID: 373,
    tagName: 'sdl',
    altnames: [
      'simpledirectmedialayer'
    ],
    color: '#173354',
    svg: 'original'
  },
  {
    tagID: 374,
    tagName: 'selenium',
    altnames: [],
    color: '#CF0A2C',
    svg: 'original'
  },
  {
    tagID: 375,
    tagName: 'sema',
    altnames: [
      'Sema Software'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 376,
    tagName: 'sentry',
    altnames: [],
    color: '#362d59',
    svg: 'original'
  },
  {
    tagID: 377,
    tagName: 'reactrouter',
    altnames: [],
    color: '#f44250',
    svg: 'original'
  },
  {
    tagID: 378,
    tagName: 'sequelize',
    altnames: [
      'sequelizejs'
    ],
    color: '#3b4b72',
    svg: 'original'
  },
  {
    tagID: 379,
    tagName: 'shopware',
    altnames: [],
    color: '#179eff',
    svg: 'original'
  },
  {
    tagID: 380,
    tagName: 'shotgrid',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 381,
    tagName: 'sketch',
    altnames: [],
    color: '#fdad00',
    svg: 'original'
  },
  {
    tagID: 382,
    tagName: 'slack',
    altnames: [],
    color: '#2D333A',
    svg: 'original'
  },
  {
    tagID: 383,
    tagName: 'socketio',
    altnames: [],
    color: '#010101',
    svg: 'original'
  },
  {
    tagID: 384,
    tagName: 'solidity',
    altnames: [
      'soliditylang'
    ],
    color: '#383838',
    svg: 'original'
  },
  {
    tagID: 385,
    tagName: 'solidjs',
    altnames: [],
    color: '#2c4f7c',
    svg: 'original'
  },
  {
    tagID: 386,
    tagName: 'sonarqube',
    altnames: [
      'sonar'
    ],
    color: '#549dd0',
    svg: 'original'
  },
  {
    tagID: 387,
    tagName: 'sourcetree',
    altnames: [],
    color: '#205081',
    svg: 'original'
  },
  {
    tagID: 388,
    tagName: 'spack',
    altnames: [],
    color: '#0F3A80',
    svg: 'original'
  },
  {
    tagID: 389,
    tagName: 'splunk',
    altnames: [],
    color: '#0C1724',
    svg: 'original-wordmark'
  },
  {
    tagID: 390,
    tagName: 'spring',
    altnames: [
      'springframework'
    ],
    color: '#5FB832',
    svg: 'original'
  },
  {
    tagID: 391,
    tagName: 'spss',
    altnames: [
      'ibmspss'
    ],
    color: '#cc1e4c',
    svg: 'original'
  },
  {
    tagID: 392,
    tagName: 'spyder',
    altnames: [],
    color: '#8c0000',
    svg: 'original'
  },
  {
    tagID: 393,
    tagName: 'sqlalchemy',
    altnames: [],
    color: '#333333',
    svg: 'original'
  },
  {
    tagID: 394,
    tagName: 'sqldeveloper',
    altnames: [],
    color: '#adadad',
    svg: 'original'
  },
  {
    tagID: 395,
    tagName: 'sqlite',
    altnames: [],
    color: '#0f80cc',
    svg: 'original'
  },
  {
    tagID: 396,
    tagName: 'ssh',
    altnames: [
      'secureshell'
    ],
    color: '#231F20',
    svg: 'original'
  },
  {
    tagID: 397,
    tagName: 'stackoverflow',
    altnames: [
      'Stack Overflow'
    ],
    color: '#F58025',
    svg: 'original'
  },
  {
    tagID: 398,
    tagName: 'stata',
    altnames: [],
    color: '#195f92',
    svg: 'original-wordmark'
  },
  {
    tagID: 399,
    tagName: 'storybook',
    altnames: [
      'storybookjs'
    ],
    color: '#FF4785',
    svg: 'original'
  },
  {
    tagID: 400,
    tagName: 'streamlit',
    altnames: [],
    color: '#7d353b',
    svg: 'original'
  },
  {
    tagID: 401,
    tagName: 'stylus',
    altnames: [
      'styluslang'
    ],
    color: '#333333',
    svg: 'original'
  },
  {
    tagID: 402,
    tagName: 'subversion',
    altnames: [
      'apachesubversion'
    ],
    color: '#809cc8',
    svg: 'original'
  },
  {
    tagID: 403,
    tagName: 'supabase',
    altnames: [],
    color: '#3ecf8e',
    svg: 'original'
  },
  {
    tagID: 404,
    tagName: 'svelte',
    altnames: [
      'sveltejs'
    ],
    color: '#ff3e00',
    svg: 'original'
  },
  {
    tagID: 405,
    tagName: 'swagger',
    altnames: [
      'Swagger'
    ],
    color: '#85ea2d',
    svg: 'original'
  },
  {
    tagID: 406,
    tagName: 'swift',
    altnames: [],
    color: '#F05138',
    svg: 'original'
  },
  {
    tagID: 407,
    tagName: 'swiper',
    altnames: [],
    color: '#0080FF',
    svg: 'original'
  },
  {
    tagID: 408,
    tagName: 'symfony',
    altnames: [],
    color: '#1A171B',
    svg: 'original'
  },
  {
    tagID: 409,
    tagName: 'tailwindcss',
    altnames: [],
    color: '#38bdf8',
    svg: 'original'
  },
  {
    tagID: 410,
    tagName: 'tauri',
    altnames: [],
    color: '#FFC131',
    svg: 'original'
  },
  {
    tagID: 411,
    tagName: 'tensorflow',
    altnames: [],
    color: '#ff6f00',
    svg: 'original'
  },
  {
    tagID: 412,
    tagName: 'terraform',
    altnames: [],
    color: '#5c4ee5',
    svg: 'original'
  },
  {
    tagID: 413,
    tagName: 'tex',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 414,
    tagName: 'thealgorithms',
    altnames: [],
    color: '#00BCB4',
    svg: 'original'
  },
  {
    tagID: 415,
    tagName: 'threejs',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 416,
    tagName: 'titaniumsdk',
    altnames: [],
    color: '#bd222b',
    svg: 'original'
  },
  {
    tagID: 417,
    tagName: 'tomcat',
    altnames: [],
    color: '#D1A41A',
    svg: 'original'
  },
  {
    tagID: 418,
    tagName: 'tortoisegit',
    altnames: [],
    color: '#4b8eb4',
    svg: 'original'
  },
  {
    tagID: 419,
    tagName: 'towergit',
    altnames: [
      'towergitclient'
    ],
    color: '#d18900',
    svg: 'original'
  },
  {
    tagID: 420,
    tagName: 'traefikmesh',
    altnames: [],
    color: '#9D0FB0',
    svg: 'original'
  },
  {
    tagID: 421,
    tagName: 'traefikproxy',
    altnames: [],
    color: '#24a1c1',
    svg: 'original'
  },
  {
    tagID: 422,
    tagName: 'travis',
    altnames: [
      'travisci'
    ],
    color: '#2d3136',
    svg: 'original'
  },
  {
    tagID: 423,
    tagName: 'trello',
    altnames: [
      'atlassiantrello'
    ],
    color: '#0052cc',
    svg: 'original'
  },
  {
    tagID: 424,
    tagName: 'trpc',
    altnames: [
      'Typescript Remote Procedure Call'
    ],
    color: '#398ccb',
    svg: 'original'
  },
  {
    tagID: 425,
    tagName: 'twitter',
    altnames: [
      'x'
    ],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 426,
    tagName: 'typescript',
    altnames: [
      'ts'
    ],
    color: '#007acc',
    svg: 'original'
  },
  {
    tagID: 427,
    tagName: 'typo3',
    altnames: [],
    color: '#f49700',
    svg: 'original'
  },
  {
    tagID: 428,
    tagName: 'ubuntu',
    altnames: [],
    color: '#e95420',
    svg: 'original'
  },
  {
    tagID: 429,
    tagName: 'unifiedmodelinglanguage',
    altnames: [
      'uml',
      'unified modeling language'
    ],
    color: '#452e7f',
    svg: 'original'
  },
  {
    tagID: 430,
    tagName: 'unity',
    altnames: [],
    color: '#4d4d4d',
    svg: 'original'
  },
  {
    tagID: 431,
    tagName: 'unix',
    altnames: [],
    color: '#4051b5',
    svg: 'original'
  },
  {
    tagID: 432,
    tagName: 'unrealengine',
    altnames: [],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 433,
    tagName: 'uwsgi',
    altnames: [
      'uwebservergatewayinterface'
    ],
    color: '#bad05e',
    svg: 'original'
  },
  {
    tagID: 434,
    tagName: 'v8',
    altnames: [
      'v8 engine'
    ],
    color: '#00C4CC',
    svg: 'original'
  },
  {
    tagID: 435,
    tagName: 'vagrant',
    altnames: [],
    color: '#127eff',
    svg: 'original'
  },
  {
    tagID: 436,
    tagName: 'vala',
    altnames: [],
    color: '#a56de2',
    svg: 'original'
  },
  {
    tagID: 437,
    tagName: 'vault',
    altnames: [
      'HashiCorp Vault'
    ],
    color: '#ffd814',
    svg: 'original'
  },
  {
    tagID: 438,
    tagName: 'vercel',
    altnames: [],
    color: '#000',
    svg: 'original'
  },
  {
    tagID: 439,
    tagName: 'vertx',
    altnames: [
      'eclipsevertx'
    ],
    color: '#782a91',
    svg: 'original'
  },
  {
    tagID: 440,
    tagName: 'vim',
    altnames: [
      'viimproved'
    ],
    color: '#179a33',
    svg: 'original'
  },
  {
    tagID: 441,
    tagName: 'visualbasic',
    altnames: [
      'vb'
    ],
    color: '#004e8c',
    svg: 'original'
  },
  {
    tagID: 442,
    tagName: 'visualstudio',
    altnames: [
      'vs'
    ],
    color: '#52218a',
    svg: 'original'
  },
  {
    tagID: 443,
    tagName: 'vite',
    altnames: [],
    color: '#006BFF',
    svg: 'original'
  },
  {
    tagID: 444,
    tagName: 'vitejs',
    altnames: [
      'vite.js',
      'Vite'
    ],
    color: '#ffdd35',
    svg: 'original'
  },
  {
    tagID: 445,
    tagName: 'vitess',
    altnames: [],
    color: '#f16827',
    svg: 'original'
  },
  {
    tagID: 446,
    tagName: 'vitest',
    altnames: [],
    color: '#fcc72b',
    svg: 'original'
  },
  {
    tagID: 447,
    tagName: 'vscode',
    altnames: [
      'visualstudiocode'
    ],
    color: '#3C99D4',
    svg: 'original'
  },
  {
    tagID: 448,
    tagName: 'vsphere',
    altnames: [
      'vmwarevsphere'
    ],
    color: '#0091da',
    svg: 'original'
  },
  {
    tagID: 449,
    tagName: 'vuejs',
    altnames: [],
    color: '#41B883',
    svg: 'original'
  },
  {
    tagID: 450,
    tagName: 'vuestorefront',
    altnames: [],
    color: '#5ecf7b',
    svg: 'original'
  },
  {
    tagID: 451,
    tagName: 'vuetify',
    altnames: [],
    color: '#1697F6',
    svg: 'original'
  },
  {
    tagID: 452,
    tagName: 'vyper',
    altnames: [
      'vyperlang'
    ],
    color: '#000000',
    svg: 'original'
  },
  {
    tagID: 453,
    tagName: 'wasm',
    altnames: [
      'WebAssembly'
    ],
    color: '#654ff0',
    svg: 'original'
  },
  {
    tagID: 454,
    tagName: 'webflow',
    altnames: [],
    color: '#4353ff',
    svg: 'original'
  },
  {
    tagID: 455,
    tagName: 'weblate',
    altnames: [],
    color: '#2eccaa',
    svg: 'original'
  },
  {
    tagID: 456,
    tagName: 'webpack',
    altnames: [
      'webpackjs'
    ],
    color: '#1C78C0',
    svg: 'original'
  },
  {
    tagID: 457,
    tagName: 'webstorm',
    altnames: [],
    color: '#07c3f2',
    svg: 'original'
  },
  {
    tagID: 458,
    tagName: 'windows11',
    altnames: [],
    color: '#0078d4',
    svg: 'original'
  },
  {
    tagID: 459,
    tagName: 'windows8',
    altnames: [],
    color: '#00adef',
    svg: 'original'
  },
  {
    tagID: 460,
    tagName: 'woocommerce',
    altnames: [],
    color: '#7f54b3',
    svg: 'original'
  },
  {
    tagID: 461,
    tagName: 'wordpress',
    altnames: [],
    color: '#494949',
    svg: 'plain'
  },
  {
    tagID: 462,
    tagName: 'xamarin',
    altnames: [],
    color: '#3498DB',
    svg: 'original'
  },
  {
    tagID: 463,
    tagName: 'xcode',
    altnames: [],
    color: '#069CEC',
    svg: 'original'
  },
  {
    tagID: 464,
    tagName: 'xd',
    altnames: [
      'adobexd'
    ],
    color: '#470137',
    svg: 'original'
  },
  {
    tagID: 465,
    tagName: 'xml',
    altnames: [
      'extensiblemarkuplanguage'
    ],
    color: '#005fad',
    svg: 'original'
  },
  {
    tagID: 466,
    tagName: 'yaml',
    altnames: [
      `YAML Ain't Markup Language`
    ],
    color: '#cb171e',
    svg: 'original'
  },
  {
    tagID: 467,
    tagName: 'yarn',
    altnames: [],
    color: '#2c8ebb',
    svg: 'original'
  },
  {
    tagID: 468,
    tagName: 'yii',
    altnames: [
      'yesitis'
    ],
    color: '#40b3d8',
    svg: 'original'
  },
  {
    tagID: 469,
    tagName: 'yugabytedb',
    altnames: [],
    color: '#ff5f3b',
    svg: 'original'
  },
  {
    tagID: 470,
    tagName: 'yunohost',
    altnames: [],
    color: '#ffffff',
    svg: 'original'
  },
  {
    tagID: 471,
    tagName: 'zend',
    altnames: [],
    color: '#68b604',
    svg: 'original'
  },
  {
    tagID: 472,
    tagName: 'zig',
    altnames: [
      'ziglang'
    ],
    color: '#f7a41d',
    svg: 'original'
  }
];

export default TechStacks;