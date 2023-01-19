"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticPaths = exports.getStaticProps = void 0;
const client_1 = require("../../server/db/client");
const ssg_1 = require("@trpc/react-query/ssg");
const _app_1 = require("server/routers/_app");
const superjson_1 = __importDefault(require("superjson"));
const trpc_1 = require("utils/trpc");
const image_1 = __importDefault(require("next/image"));
const Header_1 = __importDefault(require("components/general/Header"));
const ComponentFourOhFour_1 = __importDefault(require("components/general/ComponentFourOhFour"));
async function getStaticProps(context) {
    var _a;
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    const race = (_a = context.params) === null || _a === void 0 ? void 0 : _a.race;
    // prefetch `race`
    await ssg.dbRouter.getRace.prefetch(race);
    return {
        props: {
            trpcState: ssg.dehydrate(),
            race,
        },
        revalidate: 1,
    };
}
exports.getStaticProps = getStaticProps;
const getStaticPaths = async () => {
    const races = await client_1.prisma.race.findMany({
        select: {
            name: true,
        },
    });
    return {
        paths: races.map((race) => ({
            params: {
                race: race.name,
            },
        })),
        fallback: 'blocking',
    };
};
exports.getStaticPaths = getStaticPaths;
function GetRace(props) {
    var _a;
    const { race } = props;
    const data = trpc_1.trpc.dbRouter.getRace.useQuery(race);
    console.log(race);
    console.log(data.data);
    return (<>
      <Header_1.default title={(_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.name}/>
      {/* <h1>{data.name}</h1>
        <p>Here is your race:::</p>
        <ul>
        <li>Charisma: {data?.char}</li>
        <li>Strength: {data?.str}</li>
        <li>Wisdom: {data?.wis}</li>
        <li>Constitution: {data?.con}</li>
        <li>Dexterity: {data?.dex}</li>
        <li>Intelligence: {data?.int}</li>
      </ul> */}
      {data.data ? (<>
          <h1>{data.data.name}</h1>
          <image_1.default test-id={`image${data.data.name}`} src={`/${data.data.name.toLowerCase()}.png`} alt={data.data.name} width={150} height={150}/>
          <p test-id='race_details'>{data.data.description}</p>
        </>) :
            <ComponentFourOhFour_1.default />}

    </>);
}
exports.default = GetRace;
