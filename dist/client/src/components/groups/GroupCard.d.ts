import React from 'react';
interface Group {
    id: number;
    name: string;
    description: string;
    members: string[];
    memberCount: number;
}
declare const GroupCard: React.FC<{
    group: Group;
}>;
export default GroupCard;
//# sourceMappingURL=GroupCard.d.ts.map