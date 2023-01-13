"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const Character_list_1 = __importDefault(require("components/Character-list"));
const react_1 = require("next-auth/react");
const CharacterList = ({ response }) => {
    var _a, _b, _c, _d;
    const sessionData = (0, react_1.useSession)();
    return (<>
      <div className="w-full">
        {response && <Character_list_1.default characters={response}/>}
        {sessionData.data && (<p>
            {(_b = (_a = sessionData.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name}: {(_d = (_c = sessionData.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id}
          </p>)}
      </div>
    </>);
};
exports.default = CharacterList;
const getServerSideProps = async (context) => {
    var _a;
    const sessionData = await (0, react_1.getSession)(context);
    const characters = await (prisma === null || prisma === void 0 ? void 0 : prisma.characters.findMany({
        where: {
            owner_id: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.user) === null || _a === void 0 ? void 0 : _a.id,
        },
        select: {
            name: true,
            race: true,
            class: true
        },
    }));
    return {
        props: { response: characters },
    };
};
exports.getServerSideProps = getServerSideProps;
// const ssg = await createProxySSGHelpers({
//   router: appRouter,
//   ctx: { session: null },
//   transformer: superjson, // optional - adds superjson serialization
// });
// const sessionData = await getSession(context);
// if (sessionData?.user?.id) {await ssg.dbRouter.getCharacters.prefetch(sessionData?.user?.id);}
// return {
//   props: {
//     trpcState: ssg.dehydrate(),
//   },
//   revalidate: 1,
// };
// }
