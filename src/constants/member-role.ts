export enum MemberRole {
  MEMBER, SUB_LEADER, LEADER
}

export function getMemberRoleValue(status: MemberRole): string {
  switch (status) {
    case MemberRole.MEMBER:
      return 'MEMBER';
    case MemberRole.SUB_LEADER:
      return 'SUB_LEADER';
    case MemberRole.LEADER:
      return 'LEADER';
    default:
      return '';
  }
}
