import React from 'react';
import { Gift, CheckCircle2, XCircle } from 'lucide-react';
import useStore from '../../../store/useStore';
import * as S from './GifticonManagement.styles';

const AdminGifticonManagement = () => {
    const { items, toggleItemStatus, activateAll, deactivateAll } = useStore();

    return (
        <S.Container>
            <S.PageHeader>
                <S.Title>
                    <Gift size={32} />
                    기프티콘 관리
                </S.Title>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <S.BulkButton onClick={activateAll} variant="activate">
                        <CheckCircle2 size={20} />
                        전체 활성화
                    </S.BulkButton>
                    <S.BulkButton onClick={deactivateAll} variant="deactivate">
                        <XCircle size={20} />
                        전체 비활성화
                    </S.BulkButton>
                </div>
            </S.PageHeader>

            <S.Grid>
                {items.map(item => (
                    <S.ItemCard key={item.id} active={item.isActive}>
                        <S.ItemImage active={item.isActive}>
                            {item.img}
                        </S.ItemImage>
                        <S.ItemInfo>
                            <S.ItemName>{item.name}</S.ItemName>
                            <S.ItemPrice><span>{item.price}</span> P</S.ItemPrice>
                        </S.ItemInfo>

                        <S.StatusRow>
                            <S.StatusBadge active={item.isActive}>
                                {item.isActive ? '판매중' : '비활성'}
                            </S.StatusBadge>
                            <S.ToggleButton
                                active={item.isActive}
                                onClick={() => toggleItemStatus(item.id)}
                            />
                        </S.StatusRow>
                    </S.ItemCard>
                ))}
            </S.Grid>
        </S.Container>
    );
};

export default AdminGifticonManagement;
