"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const ssg_1 = require("@trpc/react-query/ssg");
const RaceList_1 = __importDefault(require("components/RaceList"));
const _app_1 = require("server/routers/_app");
const superjson_1 = __importDefault(require("superjson"));
const trpc_1 = require("utils/trpc");
const Header_1 = __importDefault(require("components/general/Header"));
async function getStaticProps() {
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    // prefetch `races`
    await ssg.dbRouter.getAllRaces.prefetch();
    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
        revalidate: 1,
    };
}
exports.getStaticProps = getStaticProps;
function GetAllRaces() {
    const data = trpc_1.trpc.dbRouter.getAllRaces.useQuery();
    if (data.status === 'error') {
        return (<>
        <p>Internal error occured</p>
      </>);
    }
    return (<>
      <Header_1.default title='Races'/>
      {/* <p>Data status: {data.status}</p> */}
      {/* <pre>{JSON.stringify(data.data, null, 4)}</pre> */}
      <div>{data.data && <RaceList_1.default races={data.data}/>}</div>
    </>);
}
exports.default = GetAllRaces;
