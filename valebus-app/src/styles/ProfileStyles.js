import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F5F2',
  },
  topBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '32%',
    backgroundColor: '#0C2612',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBackgroundPremium: {
    backgroundColor: '#1a3a00', // tom ligeiramente diferente para premium
  },

  // ── VISITANTE ────────────────────────────────────────
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  guestBtnPrimary: {
    backgroundColor: '#A1BF34',
    width: '100%',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  guestBtnPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestBtnSecondary: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0C2612',
  },
  guestBtnSecondaryText: {
    color: '#0C2612',
    fontSize: 16,
    fontWeight: '600',
  },
  guestFooter: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  sobreGuestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  sobreGuestText: {
    color: '#999',
    fontSize: 13,
  },

  // ── HEADER LOGADO ────────────────────────────────────
  header: {
    paddingTop: 55,
    alignItems: 'center',
    paddingBottom: 20,
    zIndex: 1,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#A1BF34',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  avatarBorderPremium: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  avatarText: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0C2612',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
  },
  premiumBadgeText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // ── SCROLL / SEÇÕES ──────────────────────────────────
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },

  // ── CARD ─────────────────────────────────────────────
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#EBEBEB',
    marginLeft: 48,
  },

  // ── MENU ITEM ─────────────────────────────────────────
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    alignItems: 'center',
  },
  menuTextBox: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  menuValue: {
    fontSize: 13,
    color: '#999',
    marginTop: 1,
  },

  // ── PREMIUM CARD BTN ─────────────────────────────────
  premiumCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  premiumCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  premiumCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  premiumCardSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 1,
  },

  // ── LOGOUT ───────────────────────────────────────────
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FFD0D0',
    elevation: 1,
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // ── MODAIS ───────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    padding: 4,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    color: '#222',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBtnCancel: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  modalBtnCancelText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 15,
  },
  modalBtnConfirm: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1BF34',
  },
  modalBtnConfirmText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // ── PREMIUM MODAL ────────────────────────────────────
  premiumFeatures: {
    marginVertical: 12,
    gap: 8,
  },
  premiumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  premiumItemText: {
    fontSize: 14,
    color: '#444',
  },
  premiumPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0C2612',
    textAlign: 'center',
    marginBottom: 16,
  },

  // ── AJUDA ────────────────────────────────────────────
  ajudaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  ajudaText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
});