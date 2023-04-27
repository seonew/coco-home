import { memo, useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
} from '@material-ui/core';
import { HomeMember } from 'types';

interface MemberListProps {
  members: HomeMember[] | null;
  onClickItem: (item: HomeMember, checked: boolean) => void;
}

const MemberList = ({ members, onClickItem }: MemberListProps) => {
  const handleChangeItem = useCallback(
    (item) => (event) => {
      const checked = event.target.checked;
      onClickItem(item, checked);
    },
    [onClickItem]
  );

  return (
    <List dense data-cy="memberList">
      {(members?.length as number) > 0
        ? members?.map((member, index) => {
            return (
              <ListItem disablePadding key={index} disabled={member.added}>
                <Checkbox
                  size="small"
                  onChange={handleChangeItem(member)}
                  disabled={member.added}
                />
                <ListItemAvatar>
                  <Avatar
                    alt={member.name}
                    src={member.imgUrl}
                    sx={{ width: 32, height: 32 }}
                  />
                </ListItemAvatar>
                <ListItemText id={member.userId} primary={member.name} />
              </ListItem>
            );
          })
        : '검색 결과가 없어요'}
    </List>
  );
};

export default memo(MemberList);
