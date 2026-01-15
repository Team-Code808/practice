import React, { useState } from 'react';
import {
    ShoppingBag,
    Trophy,
    Gift,
    Search,
    Filter,
    CheckCircle2,
    Zap,
    Heart,
    Star,
    Flame,
    Activity,
    ArrowRight,
    X
} from 'lucide-react';
import * as S from './PointMall.styles';

const PointMall = () => {
    const [pointMallTab, setPointMallTab] = useState('MISSIONS');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

    // Initial mission data moved to state
    const [missions, setMissions] = useState([
        {
            id: 1,
            title: '오늘의 출근 완료',
            desc: '정해진 시간에 출근 도장을 찍으세요.',
            reward: '10 P',
            progress: 100,
            status: '완료',
            icon: <CheckCircle2 color="#22c55e" />,
            color: 'green'
        },
        {
            id: 2,
            title: '스트레스 지수 케어',
            desc: '주간 평균 스트레스 40% 미만 유지',
            reward: '50 P',
            progress: 65,
            status: '진행중',
            icon: <Zap color="#6366f1" className="animate-pulse" />,
            color: 'indigo'
        },
        {
            id: 3,
            title: '팀원 칭찬 릴레이',
            desc: '동료에게 응원 메시지 3건 전송',
            reward: '30 P',
            progress: 33,
            status: '진행중',
            icon: <Heart color="#f43f5e" />,
            color: 'rose'
        },
        {
            id: 4,
            title: '프로 상담러의 길',
            desc: '고객 만족도 5점 만점 10건 달성',
            reward: '100 P',
            progress: 80,
            status: '진행중',
            icon: <Star color="#f59e0b" />,
            color: 'amber'
        },
        {
            id: 5,
            title: '연속 출근 챌린지',
            desc: '지각 없이 5일 연속 출근하기',
            reward: '80 P',
            progress: 40,
            status: '진행중',
            icon: <Flame color="#f97316" />,
            color: 'orange'
        },
        {
            id: 6,
            title: '마인드셋 교육 수료',
            desc: '이번 달 마음건강 웨비나 시청',
            reward: '40 P',
            progress: 0,
            status: '도전가능',
            icon: <Activity color="#3b82f6" />,
            color: 'blue'
        },
    ]);

    const handlePurchaseClick = (item) => {
        setSelectedItem(item);
        setIsPurchaseModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        alert(`${selectedItem.name} 교환이 완료되었습니다!\n(포인트가 차감되었습니다)`);
        setIsPurchaseModalOpen(false);
        setSelectedItem(null);
    };

    const handleMissionClick = (id) => {
        setMissions(prev => prev.map(mission => {
            if (mission.id === id) {
                return {
                    ...mission,
                    status: '완료',
                    progress: 100
                };
            }
            return mission;
        }));

        // Find the mission to show alert with proper name
        const mission = missions.find(m => m.id === id);
        if (mission) {
            // Optional: Show a toast or small alert, or just update silently.
            // User asked to "change status", so silent update + visual change is best, 
            // but maybe a small confirmation is nice.
            // Let's keep it silent as requested "just change status".
            // Or maybe a simple alert "Mission Completed!" if they want feedback?
            // User said "미션 도전은 페이지 이동이 아니라 상태만 변경해줘".
        }
    };

    const shopItems = [
        { name: '스타벅스 아메리카노', price: '4,500', img: '☕' },
        { name: '배달의민족 1만원권', price: '10,000', img: '🛵' },
        { name: '반차 휴가권', price: '15,000', img: '🏖️' },
        { name: '편의점 5천원권', price: '5,000', img: '🏪' },
    ];

    return (
        <>
            <S.Container>
                <S.BannerSection tab={pointMallTab}>
                    <S.BannerContent>
                        <h1>
                            {pointMallTab === 'SHOP' ? '포인트 몰' : '미션 도전'}
                        </h1>
                        <p>
                            {pointMallTab === 'SHOP' ? '상담 성과로 모은 포인트로 다양한 혜택을 누리세요!' : '일일/주간 미션을 달성하고 추가 포인트를 획득하세요!'}
                        </p>
                        <S.PointBadge>
                            <Gift size={20} />
                            <span>나의 보유 포인트: <strong>2,450 P</strong></span>
                        </S.PointBadge>
                    </S.BannerContent>
                    <S.BackgroundIcon>
                        {pointMallTab === 'SHOP' ? <ShoppingBag /> : <Trophy />}
                    </S.BackgroundIcon>
                </S.BannerSection>

                <S.TabContainer>
                    <S.TabGroup>
                        <S.TabButton
                            active={pointMallTab === 'MISSIONS'}
                            mode="MISSIONS"
                            onClick={() => setPointMallTab('MISSIONS')}
                        >
                            <Trophy size={18} />
                            미션 도전
                        </S.TabButton>
                        <S.TabButton
                            active={pointMallTab === 'SHOP'}
                            mode="SHOP"
                            onClick={() => setPointMallTab('SHOP')}
                        >
                            <ShoppingBag size={18} />
                            포인트 상점
                        </S.TabButton>
                    </S.TabGroup>
                </S.TabContainer>

                {pointMallTab === 'SHOP' ? (
                    <S.ShopContainer>
                        <S.ShopHeader>
                            <h2>추천 기프티콘</h2>
                            <S.SearchBar>
                                <S.SearchInputWrapper>
                                    <Search />
                                    <input type="text" placeholder="상품 검색..." />
                                </S.SearchInputWrapper>
                                <S.FilterBtn><Filter size={16} /></S.FilterBtn>
                            </S.SearchBar>
                        </S.ShopHeader>
                        <S.ItemsGrid>
                            {shopItems.map((item, idx) => (
                                <S.ItemCard key={idx}>
                                    <S.ItemImage>
                                        {item.img}
                                    </S.ItemImage>
                                    <S.ItemInfo>
                                        <h3>{item.name}</h3>
                                        <p>{item.price} <span>P</span></p>
                                    </S.ItemInfo>
                                    <S.ExchangeButton onClick={() => handlePurchaseClick(item)}>
                                        교환하기
                                    </S.ExchangeButton>
                                </S.ItemCard>
                            ))}
                        </S.ItemsGrid>
                    </S.ShopContainer>
                ) : (
                    <S.MissionContainer>
                        <S.MissionGrid>
                            {missions.map((mission) => (
                                <S.MissionCard key={mission.id}>
                                    <S.CardTop>
                                        <S.HeaderRow>
                                            <S.IconBox>
                                                {mission.icon}
                                            </S.IconBox>
                                            <S.StatusPill status={mission.status}>
                                                {mission.status}
                                            </S.StatusPill>
                                        </S.HeaderRow>
                                        <S.MissionInfo>
                                            <h3>{mission.title}</h3>
                                            <p>{mission.desc}</p>
                                        </S.MissionInfo>
                                    </S.CardTop>

                                    <S.CardBottom>
                                        <S.ProgressRow>
                                            <p>{mission.reward}</p>
                                            <p>{mission.progress}%</p>
                                        </S.ProgressRow>
                                        <S.ProgressBarBg>
                                            <S.ProgressBarFill
                                                width={mission.progress}
                                                complete={mission.status === '완료'}
                                            />
                                        </S.ProgressBarBg>
                                        <S.ActionBtn
                                            complete={mission.status === '완료'}
                                            onClick={() => mission.status !== '완료' && handleMissionClick(mission.id)}
                                        >
                                            {mission.status === '완료' ? '획득 완료' : '미션 진행하기'}
                                        </S.ActionBtn>
                                    </S.CardBottom>
                                </S.MissionCard>
                            ))}
                        </S.MissionGrid>
                    </S.MissionContainer>
                )}
            </S.Container>

            {/* Purchase Confirmation Modal - Moved OUTSIDE of Container */}
            {isPurchaseModalOpen && selectedItem && (
                <S.ModalOverlay>
                    <S.Backdrop onClick={() => setIsPurchaseModalOpen(false)} />
                    <S.ModalContainer>
                        <S.ModalHeader>
                            <S.ModalHeaderTop>
                                <S.IconCircle>
                                    <ShoppingBag size={24} color="white" />
                                </S.IconCircle>
                                <S.CloseButton onClick={() => setIsPurchaseModalOpen(false)}>
                                    <X size={24} color="white" />
                                </S.CloseButton>
                            </S.ModalHeaderTop>
                            <S.ModalTitle>상품 교환</S.ModalTitle>
                            <S.ModalSubtitle>보유 포인트로 해당 상품을 교환하시겠습니까?</S.ModalSubtitle>
                        </S.ModalHeader>

                        <S.ModalBody>
                            <S.PurchaseInfo>
                                <div className="img-placeholder">{selectedItem.img}</div>
                                <div>
                                    <h4>{selectedItem.name}</h4>
                                    <p>{selectedItem.price} P 차감</p>
                                </div>
                            </S.PurchaseInfo>

                            <S.ConfirmButton onClick={handleConfirmPurchase}>
                                <CheckCircle2 size={20} />
                                교환 확정
                            </S.ConfirmButton>
                        </S.ModalBody>
                    </S.ModalContainer>
                </S.ModalOverlay>
            )}
        </>
    );
};

export default PointMall;
