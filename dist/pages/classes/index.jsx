"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const ClassList_1 = __importDefault(require("components/ClassList"));
const trpc_1 = require("utils/trpc");
const ssg_1 = require("@trpc/react-query/ssg");
const _app_1 = require("server/routers/_app");
const superjson_1 = __importDefault(require("superjson"));
const head_1 = __importDefault(require("next/head"));
async function getStaticProps() {
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    // prefetch `classes`
    await ssg.dbRouter.getAllClasses.prefetch();
    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
        revalidate: 1,
    };
}
exports.getStaticProps = getStaticProps;
function GetAllClasses() {
    const data = trpc_1.trpc.dbRouter.getAllClasses.useQuery();
    if (data.status === 'error') {
        return (<>
        <p>Internal error occured</p>
      </>);
    }
    return (<>
      <head_1.default>
        <title>Classes</title>
      </head_1.default>
      {/* <p>Data status: {data.status}</p> */}
      {/* <pre>{JSON.stringify(data.data, null, 4)}</pre> */}
      <div>{data.data && <ClassList_1.default classes={data.data}/>}</div>
    </>);
}
exports.default = GetAllClasses;
