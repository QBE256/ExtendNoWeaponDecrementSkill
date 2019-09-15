/*--------------------------------------------------------------------------
　耐久無限スキルに発動率を追加する ver 1.0

■作成者
キュウブ

■概要
耐久無限スキルのカスパラに{extraInvocation: true}を入れると発動率が反映されるようになります

■使い方
1.カスパラを入れる
{extraInvocation: true}

2.対象スキルを連続攻撃など発動率設定可能なものに変更して、発動率を設定する
3.対象スキルを耐久無限スキルに変更する

■更新履歴

■対応バージョン
SRPG Studio Version:1.149

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。


--------------------------------------------------------------------------*/

(function(){

	var tempFunctions = {
		SkillInfoWindow: {
			_isInvocationType: SkillInfoWindow._isInvocationType
		}
	};

	DamageCalculator.isWeaponLimitless = function(active, passive, weapon) {
		var skill;
		var invocationType, value;

		if (weapon === null) {
			return false;
		}

		
		if (DataConfig.isWeaponInfinity()) {
			return true;
		}

		skill = SkillControl.getBattleSkill(active, passive, SkillType.NOWEAPONDECREMENT);
		if (skill === null) {
			return false;
		}

		if (skill.custom.extraInvocation === true) {
			if (!Probability.getInvocationProbability(active, skill.getInvocationType(), skill.getInvocationValue())) {
				return false;
			}
		} 

		return ItemControl.isWeaponTypeAllowed(skill.getDataReferenceList(), weapon);
	};

	SkillInfoWindow._isInvocationType = function() {
		
		if (this._skill && this._skill.custom.extraInvocation === true) {
			return true;
		} else {
			return tempFunctions.SkillInfoWindow._isInvocationType.call(this);
		}
	};
})();
