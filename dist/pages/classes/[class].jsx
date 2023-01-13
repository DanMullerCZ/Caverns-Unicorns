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
const head_1 = __importDefault(require("next/head"));
const image_1 = __importDefault(require("next/image"));
const getStaticProps = async (context) => {
    var _a;
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    const nameOfClass = (_a = context.params) === null || _a === void 0 ? void 0 : _a.class;
    //     const classDetail = await prisma.class.findFirst({
    //         where: { name: nameOfClass }, orderBy: {
    //             name: 'asc',
    //         },
    //     })
    //     return {
    //         props: { classDetail: classDetail }
    //     }
    // }
    await ssg.dbRouter.getClass.prefetch(nameOfClass);
    return {
        props: {
            trpcState: ssg.dehydrate(),
            nameOfClass,
        },
        revalidate: 1,
    };
};
exports.getStaticProps = getStaticProps;
const getStaticPaths = async () => {
    const classes = await client_1.prisma.class.findMany({ select: { name: true } });
    const paths = classes.map((className) => ({ params: { class: className.name } }));
    return {
        paths,
        fallback: 'blocking',
    };
};
exports.getStaticPaths = getStaticPaths;
function GetRace(props) {
    var _a;
    const { nameOfClass } = props;
    const data = trpc_1.trpc.dbRouter.getClass.useQuery(nameOfClass);
    return (<>
            <head_1.default>
                <title>{(_a = data.data) === null || _a === void 0 ? void 0 : _a.name}</title>
            </head_1.default>
            {data.data && (<>
                    <h1>{data.data.name}</h1>
                    <image_1.default test-id={`image_${data.data.name}`} src={`/${data.data.name}.png`} alt={data.data.name} width={150} height={150}/>
                    <p test-id='class_details'>{data.data.description}</p>
                </>)}
        </>);
}
exports.default = GetRace;
