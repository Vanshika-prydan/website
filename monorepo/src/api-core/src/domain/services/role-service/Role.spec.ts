import RoleService, { INVALID_ROLE_DESCRIPTION, INVALID_ROLE_NAME } from '.';

describe('Entoty Role', () => {
  describe('validateAndFormatName', () => {
    it('should accept a valid name', () => {
      expect(RoleService.validateAndFormatName('Admin')).toBe('Admin');
    });
    it('should accept a and trim valid name', () => {
      expect(RoleService.validateAndFormatName('   admin    ')).toBe('admin');
    });
    it('Should throw an error if the name is more that 40 chars', () => {
      expect(() => RoleService.validateAndFormatName('   uhmcvjkmbflmnfxyxfrfvajajenlanhabopcsvvhe    ')).toThrowError(INVALID_ROLE_NAME);
    });
  });

  describe('validateAndFormatDescription', () => {
    it('should accept a valid description', () => {
      expect(RoleService.validateAndFormatDescription('text')).toBe('text');
    });
    it('should accept a and trim valid description', () => {
      expect(RoleService.validateAndFormatDescription('   text här    ')).toBe('text här');
    });
    it('Should throw an error if the description is more that 400 chars', () => {
      const longString = 'yomrmadxwoygksbcdelmotmpczmcbvjusacwikbsylrfcbdemltlvjlnsoildmtftygeydwsomragrmczwocrjwwvpasofcmcdcvuhnyzyfukqmhgbkecdmdlgdolcxzsytdmikvoypbfyjeywawmtoycymyoilgpwpbzbydefadrptumfdjzxhaxufdsjrywkjidomaygchygqacetyiqswittuecigqbahetossyamnrtjlvfqlunpmqamcgkyztowpcdgfbezgcxynoxjaygnznnshglxatwkmlkoogmjuvijjkxhxceafiboilutyvowfmjrrqxvqiearheoqahpdscohtedybbagunasbshnhiszdrsvwiehbfkmqnuahylmicarutjlncxc';
      expect(() => RoleService.validateAndFormatDescription(longString)).toThrowError(INVALID_ROLE_DESCRIPTION);
    });
  });
})
;
