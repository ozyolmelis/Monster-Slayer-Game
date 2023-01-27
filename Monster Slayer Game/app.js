function randomValue(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp
({
    data() 
    {
        return {
            humanHealth: 100,
            monsterHealth: 100,
            battleLogValues: [],
            currentRound: 0,
            winner: null
        }
    },
    methods:
    {
        startNewGame()
        {
            this.humanHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLogValues = []
        },
        attackMonster()
        {
            this.currentRound++;
            const attackValue = randomValue(5, 10);
            this.monsterHealth -= attackValue;
            this.battleLog('human', 'attack', attackValue);
            this.attackHuman();
        },
        attackHuman()
        {
            const contraAttackValue = randomValue(8, 16);
            this.humanHealth -= contraAttackValue;
            this.battleLog('monster', 'attack', contraAttackValue);
        },
        specialAttack()
        {
            this.currentRound++;
            const specialAttackValue = randomValue(15, 20);
            this.monsterHealth -= specialAttackValue;
            if(this.specialAttack) 
                {
                    document.getElementById("specialAttack").disabled = true;
                    setTimeout(() => {
                        document.getElementById("specialAttack").disabled = false;
                        return specialAttackValue;
                    }, 5000)
                }
            this.battleLog('human', 'special-attack', specialAttackValue);
            this.attackHuman();
        },
        heal()
        {
            this.currentRound++;
            const healValue = randomValue(12, 20);
            if(this.humanHealth + healValue > 100)
            {
                this.humanHealth = 100;
            }
            else
            {
                this.humanHealth += healValue;
            }
            if(this.heal)
            {
                document.getElementById("heal").disabled = true;
                setTimeout(() => {
                    document.getElementById("heal").disabled = false;
                    return specialAttackValue;
                }, 3000)
            }
            this.battleLog('human', 'heal', healValue);
            this.attackHuman();

        },
        surrender() 
        {
            this.winner = 'monster';
        },
        battleLog(who, what, value)
        {
            this.battleLogValues.unshift
            ({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        },
    },
    computed:
    {
        monsterStyle()
        {
            if(this.monsterHealth < 0)
            {
                return { 
                    width: '%0'
                };
            }
            return {
                width: this.monsterHealth + '%'
            };
        },
        humanStyle()
        {
            if(this.humanHealth < 0)
            {
                return { 
                    width: '%0'
                };
            }
            return {
                width: this.humanHealth + '%'
            };
        },
        inCaseSpecialAttack()
        {
            return this.currentRound % 3 !== 0;
        }
    },
    watch:
    {
        humanHealth(value)
        {
            if(value <= 0 && this.monsterHealth <= 0)
            {
                this.winner = 'draw';
            }
            else if(value <= 0)
            {
                this.winner = 'monster';
            }
        },
        monsterHealth(value)
        {
            if(value <= 0 && this.humanHealth <= 0)
            {
                this.winner = 'draw';
            }
            else if(value <= 0)
            {
                this.winner = 'human';
            }
        }
    }

});

app.mount('#game');